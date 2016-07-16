const path = require('path');
const webpack = require('webpack');
const autoprefixer = require('autoprefixer');

// Plugins
const AssetsPlugin = require('assets-webpack-plugin');

// Paths
const outputPath = path.resolve(__dirname, '..', 'assets');
const nodeModulesPath = path.resolve(__dirname, '..', 'node_modules');

// Loaders
const loaders = require('./loaders');
const buildCSSLoader = require('./build-css-loader');

module.exports = {
  devtool: 'inline-source-map',
  context: path.resolve(__dirname, '..', 'src'),
  entry: {
    app: [
      `webpack-dev-server/client?http://localhost:${parseInt(process.env.PORT, 10) + 1}`,
      './app.jsx',
    ],
  },
  output: {
    path: outputPath,  // This is where images AND js will go
    publicPath: '/assets/', // This is used to generate URLs to e.g. images
    filename: '[name]-[hash].js',
    chunkFilename: '[name]-[chunkhash].js',
  },
  resolve: {
    modulesDirectories: ['node_modules'],
    extensions: ['', '.webpack.js', '.web.js', '.js', '.jsx', '.json'],
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        BROWSER: JSON.stringify(true),
        NODE_ENV: JSON.stringify('development'),
      },
      __DEVELOPMENT__: true,
      __DEVTOOLS__: true,
    }),
    new AssetsPlugin({
      filename: 'assets.json',
    }),
    new webpack.optimize.OccurenceOrderPlugin(),
  ],
  module: {
    loaders: loaders.concat([{
      test: /\.less$/,
      loader: `style!${buildCSSLoader('less', false, false)}`,
    }, {
      test: /\.scss$/,
      exclude: /theme\/global\.scss$/,
      loader: `style!${buildCSSLoader('sass', false, false)}`,
    }, {
      test: /theme\/global\.scss$/,
      loader: `style!${buildCSSLoader('sass', true, false)}`,
    }]),
  },
  postcss() {
    return [autoprefixer];
  },
  sassLoader: {
    includePaths: [nodeModulesPath],
  },
};
