// The signature for this middleware is:
// VERBOSE: `(api) => ({getState, dispatch}) => next => action`
// CONCICE: `api => store => next => action`
export default api => () => next => action => {
  // Special Case: Flush
  if (typeof action.flush === 'function') {
    action.flush(api);
    return next(action);
  }

  // Extract properties from `action`
  // And require `promise` to exist
  const { ...rest, promise, types } = action;
  if (!promise) {
    return next(action);
  }
  const [requestType, successType, failureType] = types;

  // Expect `types` to be an array of 3 strings
  if (!Array.isArray(types) || types.length !== 3) {
    throw new Error('Expected an array of three action types.');
  }
  if (!types.every(type => typeof type === 'string')) {
    throw new Error('Expected action types to be strings.');
  }

  // Dispatch the `REQUEST` action type
  // This signals the beginning of an async request
  next({ ...rest, type: requestType });

  // Invoke the `promise` that was provided
  return promise(api).then((response) => {
    // On success, dispatch the `SUCCESS` action type with `response`
    return next({ ...rest, response, type: successType });
  }).catch((error) => {
    // Throw error for non-API errors
    if (!error.code) {
      throw error;
    }

    // On error, dispatch the `FAILURE` action type with `error`
    return next({ ...rest, error, type: failureType });
  });
};
