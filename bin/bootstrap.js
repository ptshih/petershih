/* eslint no-underscore-dangle: 0, global-require: 0 */

const path = require('path');
const nconf = require('nconf');
const babelConfig = require('../package.json').babel;

// global.rfr = require('rfr');

// Allow `require` paths to be relative from base path
// https://gist.github.com/branneman/8048520
process.env.NODE_PATH = path.join(__dirname, '..');
require('module').Module._initPaths();

// Environment
require('dotenv').config({
  silent: true,
});

nconf.env().defaults({
  BROWSER: false,
  NODE_ENV: 'development',
  HOST: 'http://www.petershih.dev:9090',
  API_HOST: 'http://api.petershih.dev:9090',
  PORT: 9090,
});

// This transpiles everything below this line from ES6 to ES5
// NOTE: Might not be good for production in the long run
// https://medium.com/javascript-scene/how-to-use-es6-for-isomorphic-javascript-apps-2a9c3abe5ea2
// https://medium.com/@Cuadraman/how-to-use-babel-for-production-5b95e7323c2f#.q66p95gld
require('babel-core/register')(babelConfig);

// Support isomorphic CSS imports
require('css-modules-require-hook')({
  generateScopedName: process.env.NODE_ENV === 'production' ?
    '[hash:base64]' :
    '[name]---[local]---[hash:base64:5]',
  rootDir: './src',
  extensions: ['.scss'],
});

require('../modules/images-require-hook')('.jpg');

if (process.env.NODE_ENV !== 'production') {
  require('./webpack-dev-server');
}

require('../server');
