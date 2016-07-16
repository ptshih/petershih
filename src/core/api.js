import _ from 'lodash';
// import querystring from 'querystring';
import Promise from 'bluebird';
import request from './request';
import debounce from './debounce';
import auth from './auth';

// Wrapper around API response and error handling
const _request = (options) => request(options).then((body) => body.data).catch((apiError) => {
  // Delete any existing access tokens if they are invalid
  if (apiError.status === 401) {
    auth.removeAccessToken();
  }

  const error = new Error();
  if (apiError.timeout) {
    error.code = 408;
    error.message = 'Request Timeout';
  } else if (apiError.status && apiError.response) {
    error.code = apiError.status;
    if (_.isObject(apiError.response.body)) {
      error.message = apiError.response.body.data;
    } else if (_.isString(apiError.response.text)) {
      error.message = apiError.response.text;
    } else {
      error.message = 'Unknown Client Error';
    }
  } else {
    error.code = 500;
    error.message = 'Internal Server Error';
  }
  throw error;
});

// Debounced version of `send`
const _requestDebounced = debounce(_request, 2000);

export default {
  // TODO: use environment configuration instead
  basePath: `${window.location.origin}/api`,

  getAuthHeaders() {
    return auth.buildAuthHeaders();
  },

  getOptions(requestOptions = {}) {
    // Default Options
    const options = Object.assign({}, requestOptions);

    // Headers
    options.headers = Object.assign({}, this.getAuthHeaders(), options.headers);

    // Url from Path
    if (options.path) {
      options.url = this.basePath + options.path;
      delete options.path;
    }

    return options;
  },

  request(requestOptions) {
    return _request(this.getOptions(requestOptions));
  },

  requestDebounced(requestOptions) {
    return _requestDebounced(this.getOptions(requestOptions));
  },

  flush() {
    _requestDebounced.flush();
  },

  login: Promise.method((email, password) => {
    return _request({
      method: 'POST',
      url: `${this.basePath}/login`,
      json: {
        email,
        password,
      },
    }).then((user) => {
      auth.setAccessToken(user.access_token);
      auth.setFeatures(user.features);
      return user;
    });
  }),

  register: Promise.method((email, password) => {
    return _request({
      method: 'POST',
      url: `${this.basePath}/register`,
      json: {
        email,
        password,
      },
    }).then((user) => {
      auth.setAccessToken(user.access_token);
      auth.setFeatures(user.features);
      return user;
    });
  }),

  forgotPassword: Promise.method((email) => {
    return _request({
      method: 'POST',
      url: `${this.basePath}/forgot_password`,
      json: {
        email,
      },
    }).then(() => email);
  }),

  resetPassword: Promise.method((token, password) => {
    return _request({
      method: 'POST',
      url: `${this.basePath}/reset_password`,
      json: {
        token,
        password,
      },
    }).then((user) => {
      auth.setAccessToken(user.access_token);
      auth.setFeatures(user.features);
      return user;
    });
  }),
};
