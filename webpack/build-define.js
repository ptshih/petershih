const nconf = require('nconf');

// Read `.env` into `process.env`
require('dotenv').config({
  silent: true,
});

// Load nconf environment variable defaults
nconf.env().defaults({
  BROWSER: true,
  NODE_ENV: JSON.stringify('development'),
});

module.exports = function buildDefine() {
  return {
    'process.env': {
      BROWSER: JSON.stringify(nconf.get('BROWSER')),
      NODE_ENV: JSON.stringify(nconf.get('NODE_ENV')),
      URL: JSON.stringify(nconf.get('URL')),
      API_URL: JSON.stringify(nconf.get('API_URL')),
      PORT: JSON.stringify(nconf.get('PORT')),
    },
  };
};
