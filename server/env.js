import _ from 'lodash';
import nconf from 'nconf';
import debug from 'modules/debug';

const envs = {
  // Build
  BUILD_ASSETS: {
    required: false,
  },

  // Application
  NODE_ENV: {
    required: true,
    export: true,
  },
  PORT: {
    required: true,
    export: true,
    type: Number,
  },
  HOST: {
    required: false,
    export: true,
  },
  API_HOST: {
    required: false,
    export: true,
  },
  WS_ADDRESS: {
    required: false,
    export: true,
  },
  DEBUG_PREFIX: {
    required: false,
  },
  CLIENT_TOKEN: {
    required: false,
  },
  WORKER_TOKEN: {
    required: false,
  },

  // MongoDB
  MONGODB_URL: {
    required: false,
  },
  MONGODB_USER: {
    required: false,
  },
  MONGODB_PASSWORD: {
    required: false,
  },

  // Vendor
  STRIPE_SECRET_KEY: {
    required: false,
  },
  MAILGUN_KEY: {
    required: false,
  },
  GOOGLE_ANALYTICS_ID: {
    required: false,
    export: true,
  },
  HEAP_ID: {
    required: false,
    export: true,
  },
};

const env = {};
_.each(envs, (envProps, envName) => {
  let envVal = nconf.get(envName) || '[UNDEFINED]';

  // Required
  if (envProps.required && envVal === '[UNDEFINED]') {
    debug.error(`Missing ENV Variable: ${envName}. Check your .env file.`);
    process.exit(1);
  }

  // Cast to Number
  if (envProps.type === Number) {
    envVal = Number(envVal);
  }

  // Redacted
  if (envProps.redacted) {
    envVal = '[REDACTED]';
  }

  // Export
  if (envProps.export) {
    env[envName] = envVal;
  }

  debug.info(`├── ${envName}=${envVal} ──┤`);
});

module.exports = env;
