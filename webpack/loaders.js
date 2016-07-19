module.exports = [{
  test: /\.jsx?$/,
  loader: 'babel',
  exclude: /node_modules/,
  query: {
    presets: ['es2015', 'react', 'stage-1'],
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
  loader: 'file?mimetype=application/font-woff2',
}, {
  test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
  loader: 'file?mimetype=application/x-font-truetype',
}, {
  test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
  loader: 'file?mimetype=application/vnd.ms-fontobject',
}, {
  test: /\.otf(\?v=\d+\.\d+\.\d+)?$/,
  loader: 'file?mimetype=application/x-font-opentype',
}, {
  test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
  loader: 'file?mimetype=image/svg+xml',
}, {
  test: /\.(png|jpg|jpeg|gif)$/,
  loader: 'file',
}, {
  test: /\.(wav|mp3)$/,
  loader: 'file',
}];
