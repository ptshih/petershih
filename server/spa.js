import Helmet from 'react-helmet';

// Webpack assets manifest
import assets from '../assets/manifest';

module.exports = (env) => (req, res) => {
  // Get `<head>` values defined in `react-helmet` on the client side
  const head = Helmet.rewind();

  // Render express view
  return res.render('app', {
    env,
    head,
    assets,
  });
};
