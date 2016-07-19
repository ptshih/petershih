import path from 'path';
import autoprefixer from 'autoprefixer';

const DEBUG = process.env.NODE_ENV !== 'production';
const OUTPUT_PATH = path.resolve(__dirname, '..', 'assets');
const NODE_MODULES_PATH = path.resolve(__dirname, '..', 'node_modules');
const AUTOPREFIXER_BROWSERS = [
  'Android 2.3',
  'Android >= 4',
  'Chrome >= 35',
  'Firefox >= 31',
  'Explorer >= 9',
  'iOS >= 7',
  'Opera >= 12',
  'Safari >= 7.1',
];

// Plugins
import plugins from './plugins';

// Loaders
import loaders from './loaders';
import buildCSSLoaders from './build-css-loaders';

// Entry
const appEntry = ['./app.jsx'];
if (DEBUG) {
  appEntry.unshift(`webpack-dev-server/client?http://localhost:${parseInt(process.env.PORT, 10) + 1}`);
}

// Webpack Config
module.exports = {
  debug: DEBUG,

  // Choose a developer tool to enhance debugging
  // http://webpack.github.io/docs/configuration.html#devtool
  devtool: DEBUG ? 'cheap-module-eval-source-map' : false,

  // Context for `entry`
  context: path.resolve(__dirname, '..', 'src'),

  entry: {
    app: appEntry,
  },
  output: {
    path: OUTPUT_PATH,  // This is where images AND js will go
    publicPath: '/assets/', // This is used to generate URLs to e.g. images
    filename: '[name]-[chunkhash].js',
    chunkFilename: '[name]-[chunkhash].js',
  },
  resolve: {
    modulesDirectories: ['node_modules'],
    extensions: ['', '.js', '.jsx', '.json'],
  },
  module: {
    loaders: loaders.concat([{
      test: /\.less$/,
      loader: buildCSSLoaders(!DEBUG, 'less', true),
    }, {
      test: /\.scss$/,
      exclude: /theme\/global\.scss$/,
      loader: buildCSSLoaders(!DEBUG, 'sass', true),
    }, {
      test: /theme\/global\.scss$/,
      loader: buildCSSLoaders(!DEBUG, 'sass', false),
    }]),
  },

  // PostCSS Configuration
  postcss() {
    return {
      default: [autoprefixer({ browsers: AUTOPREFIXER_BROWSERS })],
      sass: [autoprefixer({ browsers: AUTOPREFIXER_BROWSERS })],
      less: [autoprefixer({ browsers: AUTOPREFIXER_BROWSERS })],
    };
  },

  // Sass Configuration
  sassLoader: {
    includePaths: [NODE_MODULES_PATH],
  },

  // Plugins
  plugins,
};
