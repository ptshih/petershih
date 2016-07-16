module.exports = function(preprocessor = '', modules = false, production = false) {
  const loaders = [];
  const downStreamLoaders =  (preprocessor) ? 2 : 1;

  // CSS loader params
  const cssParams = [];
  cssParams.push(`importLoaders=${downStreamLoaders}`);

  // Enable CSS Modules
  if (!modules) {
    cssParams.push('modules');
    cssParams.push('camelCase');

    if (!production) {
      cssParams.push('sourceMap');
    }
  }

  // Debug friendly CSS class names
  if (!production) {
    cssParams.push('localIdentName=[name]---[local]---[hash:base64:5]');
  }

  // Add CSS loader with params
  loaders.push('css?' + cssParams.join('&'));

  // Add PostCSS loader
  loaders.push('postcss');

  // Add scss/less loader
  if (preprocessor === 'sass' || preprocessor === 'less') {
    const preprocessorParams = preprocessor + (!production ? '?outputStyle=expanded&sourceMap' : '');
    loaders.push(preprocessorParams);
  }

  return loaders.join('!');
};
