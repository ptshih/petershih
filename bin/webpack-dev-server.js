const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const webpackConfig = require('../webpack/config.dev.webpack.js');
const webpackCompiler = webpack(webpackConfig);
const webpackDevServer = new WebpackDevServer(webpackCompiler, {
  publicPath: webpackConfig.output.publicPath,
  stats: {
    colors: true,
    hash: false,
    timings: true,
    chunks: false,
    chunkModules: false,
    modules: false,
  },
});

// Start webpack-dev-server
const port = parseInt(process.env.PORT, 10) + 1;
webpackDevServer.listen(port, 'localhost', () => {
  console.log(`\nWebpack Dev Server [PORT: ${port}] [NODE_ENV: ${process.env.NODE_ENV}]\n`);
});
