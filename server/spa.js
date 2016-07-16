const fs = require('fs');
const path = require('path');

const assetsPath = path.join(__dirname, '..', 'assets.json');

// Assets are cached for `production` only
let cachedAssets;

module.exports = (env) => (req, res) => {
  // Assets are ready to render
  function finishRenderIndex(assets) {
    // Render express view
    return res.render('app', {
      title: 'Peter Shih',
      env,
      assets,
    });
  }

  // Attempt to start rendering if assets are ready
  function startRenderIndex() {
    fs.readFile(assetsPath, 'utf8', (err, assetsJSON) => {
      if (err) {
        // Try again after 1 second
        setTimeout(() => {
          startRenderIndex();
        }, 1000);
      } else {
        // Cache assets and finish rendering
        cachedAssets = JSON.parse(assetsJSON);
        finishRenderIndex(cachedAssets);
      }
    });
  }

  // If in `production`, try to use cached assets
  if (process.env.NODE_ENV === 'production' && cachedAssets) {
    finishRenderIndex(cachedAssets);
  } else {
    startRenderIndex();
  }
};
