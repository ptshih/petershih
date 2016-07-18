const path = require('path');
const nconf = require('nconf');
const babelConfig = require('../package.json').babel;

// Allow `require` paths to be relative from base path
// https://gist.github.com/branneman/8048520
process.env.NODE_PATH = path.join(__dirname, '..');
require('module').Module._initPaths();

// Environment
require('dotenv').config({
  silent: true,
});

nconf.env().defaults({
  NODE_ENV: 'test',
  HOST: 'http://www.petershih.dev:9090',
  API_HOST: 'http://api.petershih.dev:9090',
  PORT: 9090,
});

// Force NODE_ENV to be `test`
process.env.NODE_ENV = 'test';

// This transpiles everything below this line from ES6 to ES5
require('babel-core/register')(babelConfig);

require('../test/common');
