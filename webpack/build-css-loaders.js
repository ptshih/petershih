/* eslint prefer-template: 0 */

const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = function buildCSSLoaders(production = false, preprocessor = '', modules = false) {
  const loaders = [];
  const downStreamLoaders = (preprocessor) ? 2 : 1;

  // CSS loader
  const cssQuery = {
    importLoaders: downStreamLoaders,
    modules: !!modules,
    camelCase: !!modules,
    sourceMap: !!modules && !production,
    localIdentName: !production ? '[name]---[local]---[hash:base64:5]' : '',
    // minimize: production,
  };
  loaders.push('css?' + JSON.stringify(cssQuery));

  // Add PostCSS and SASS/LESS loader
  if (preprocessor === 'sass' || preprocessor === 'less') {
    const preprocessorQuery = {
      sourceMap: !production,
      outputStyle: !production ? 'expanded' : '',
    };

    loaders.push('postcss?pack=' + preprocessor);
    loaders.push(preprocessor + '?' + JSON.stringify(preprocessorQuery));
  } else {
    loaders.push('postcss?pack=default');
  }

  if (production) {
    return ExtractTextPlugin.extract('style', loaders.join('!'));
  }

  return ['style'].concat(loaders).join('!');
};
