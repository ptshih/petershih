const path = require('path');
const webpack = require('webpack');
const autoprefixer = require('autoprefixer');

// Plugins
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const AssetsPlugin = require('assets-webpack-plugin');

// Paths
const outputPath = path.resolve(__dirname, '..', 'assets');
const nodeModulesPath = path.resolve(__dirname, '..', 'node_modules');

// Loaders
const loaders = require('./loaders');
const buildCSSLoader = require('./build-css-loader');

module.exports = {
  // devtool: 'source-map',
  context: path.resolve(__dirname, '..', 'src'),
  entry: {
    app: [
      './app.jsx',
    ],
  },
  output: {
    path: outputPath,  // This is where images AND js will go
    publicPath: '/assets/', // This is used to generate URLs to e.g. images
    filename: '[name]-[chunkhash].js',
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
        NODE_ENV: JSON.stringify('production'),
      },
      __DEVELOPMENT__: false,
      __DEVTOOLS__: false,
    }),
    new AssetsPlugin({
      filename: 'assets.json',
    }),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compressor: {
        warnings: false,
        screw_ie8: true,
      },
    }),
    new webpack.optimize.AggressiveMergingPlugin(),
    new ExtractTextPlugin('[name]-[chunkhash].css', {
      allChunks: true,
    }),
  ],
  module: {
    loaders: loaders.concat([{
      test: /\.less$/,
      loader: ExtractTextPlugin.extract('style', buildCSSLoader('less', false, true)),
    }, {
      test: /\.scss$/,
      exclude: /theme\/global\.scss$/,
      loader: ExtractTextPlugin.extract('style', buildCSSLoader('sass', false, true)),
    }, {
      test: /theme\/global\.scss$/,
      loader: ExtractTextPlugin.extract('style', buildCSSLoader('sass', true, true)),
    }]),
  },
  postcss() {
    return [autoprefixer];
  },
  sassLoader: {
    includePaths: [nodeModulesPath],
  },
};
