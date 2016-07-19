import webpack from 'webpack';
import path from 'path';
import AssetsPlugin from 'assets-webpack-plugin';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import buildDefine from './build-define';

// Plugins
const sharedPlugins = [
  // Define free variables
  // https://webpack.github.io/docs/list-of-plugins.html#defineplugin
  new webpack.DefinePlugin(buildDefine()),

  // Emit a file with assets paths
  // https://github.com/sporto/assets-webpack-plugin#options
  new AssetsPlugin({
    path: path.resolve(__dirname, '../assets'),
    filename: 'manifest.js',
    processOutput: x => `module.exports = ${JSON.stringify(x)};`,
  }),

  // Assign the module and chunk ids by occurrence count
  // Consistent ordering of modules required if using any hashing ([hash] or [chunkhash])
  // https://webpack.github.io/docs/list-of-plugins.html#occurrenceorderplugin
  new webpack.optimize.OccurenceOrderPlugin(true),
];
const prodPlugins = [
  // Search for equal or similar files and deduplicate them in the output
  // https://webpack.github.io/docs/list-of-plugins.html#dedupeplugin
  new webpack.optimize.DedupePlugin(),

  // Minimize all JavaScript output of chunks
  // https://github.com/mishoo/UglifyJS2#compressor-options
  new webpack.optimize.UglifyJsPlugin({
    compressor: {
      screw_ie8: true, // jscs:ignore requireCamelCaseOrUpperCaseIdentifiers
      warnings: false,
    },
  }),

  // A plugin for a more aggressive chunk merging strategy
  // https://webpack.github.io/docs/list-of-plugins.html#aggressivemergingplugin
  new webpack.optimize.AggressiveMergingPlugin(),

  new ExtractTextPlugin('[name]-[chunkhash].css', {
    allChunks: true,
  }),
];

module.exports = sharedPlugins.concat(prodPlugins);
