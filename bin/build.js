const webpack = require('webpack');
const webpackConfig = require('../webpack/config.prod.webpack.js');

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
