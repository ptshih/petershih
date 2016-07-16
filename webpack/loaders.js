module.exports = [{
  test: /\.jsx?$/,
  loader: 'babel',
  exclude: /node_modules/,
  query: {
    presets: ['es2015', 'react', 'stage-0'],
    plugins: ['transform-runtime'],
  },
}, {
  test: /\.json?$/,
  loader: 'json',
}, {
  test: /\.txt$/,
  loader: 'raw',
}, {
  test: /\.woff(\?v=\d+\.\d+\.\d+)?$/,
  loader: 'file?mimetype=application/font-woff',
}, {
  test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/,
  loader: 'file?mimetype=application/font-woff',
}, {
  test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
  loader: 'file?mimetype=application/octet-stream',
}, {
  test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
  loader: 'file',
}, {
  test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
  loader: 'url?limit=10000&mimetype=image/svg+xml',
}, {
  test: /\.(png|jpg|jpeg|gif)$/,
  loader: 'url?limit=10000',
}, {
  test: /\.(wav|mp3)$/,
  loader: 'file',
}];
