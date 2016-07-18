const nconf = require('nconf');

// Environment
require('dotenv').config({
  silent: true,
});

nconf.env().defaults({
  BROWSER: true,
  NODE_ENV: JSON.stringify('development'),
  HOST: JSON.stringify('http://www.petershih.dev:9090'),
  API_HOST: JSON.stringify('http://api.petershih.dev:9090'),
  PORT: 9090,
});

module.exports = function buildDefine() {
  const DEBUG = nconf.get('NODE_ENV') !== 'production';

  return {
    'process.env': {
      BROWSER: JSON.stringify(true),
      NODE_ENV: JSON.stringify(nconf.get('NODE_ENV')),
      HOST: JSON.stringify(nconf.get('HOST')),
      API_HOST: JSON.stringify(nconf.get('API_HOST')),
      PORT: JSON.stringify(nconf.get('PORT')),
    },
    __DEVELOPMENT__: DEBUG,
    __DEVTOOLS__: DEBUG,
  };
};
