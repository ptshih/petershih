require('babel-core/register')(require('../package.json').babel);

const webpack = require('webpack');
const webpackConfig = require('../webpack/webpack.config.js');

webpack(webpackConfig).run((err, stats) => {
  if (err) {
    throw err;
  }

  console.log(stats.toString({
    colors: true,
    timings: true,
    reasons: false,
    hash: false,
    version: false,
    chunks: false,
    chunkModules: false,
    cached: false,
    cachedAssets: false,
  }));
});
