/* eslint no-underscore-dangle: 0, global-require: 0 */

require('babel-core/register')(require('../package.json').babel);

const path = require('path');
const nconf = require('nconf');
// global.rfr = require('rfr');

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
  NODE_ENV: 'development',
});

// Support CSS Modules imports on the server side
require('css-modules-require-hook')({
  generateScopedName: process.env.NODE_ENV === 'production' ?
    '[hash:base64]' :
    '[name]---[local]---[hash:base64:5]',
  rootDir: './www',
  extensions: ['.scss'],
});

// Support image imports on the server side
require('images-require-hook')('.jpg');

if (process.env.NODE_ENV !== 'production') {
  // Launch the webpack dev server, which then launches the web/api server when ready
  require('./webpack-dev-server');
} else {
  // Launch the web/api server
  require('../server');
}
