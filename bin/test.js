require('babel-core/register')(require('../package.json').babel);

const path = require('path');
const nconf = require('nconf');

// Allow `require` paths to be relative from base path
// https://gist.github.com/branneman/8048520
process.env.NODE_PATH = path.join(__dirname, '..');
require('module').Module._initPaths();

// Read `.env` into `process.env`
require('dotenv').config({
  silent: true,
});

// Load nconf environment variable defaults
nconf.env().defaults({
  NODE_ENV: 'test',
});

// Force NODE_ENV to be `test`
process.env.NODE_ENV = 'test';

// Start tests
require('../test/common');
