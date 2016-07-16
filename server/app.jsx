import React from 'react';

const Index = (props) => {
  function getScrewIE() {
    const html = `
      <!--[if lt IE 9]>
        <p style="color:red">You are using an <strong>outdated</strong> browser.
        Please <a href="http://outdatedbrowser.com/">upgrade your browser</a>
        to improve your experience.</p>
      <![endif]-->
    `;
    return <div dangerouslySetInnerHTML={{ __html: html }}></div>;
  }

  function getCSS() {
    const css = props.assets.app.css;
    if (!css) {
      return null;
    }

    return <link href={css} rel="stylesheet" />;
  }

  function getJS() {
    // Get the app js url from webpack assets
    const js = props.assets.app.js;

    return <script src={js}></script>;
  }

  // function getGoogleAnalyticsScript() {
  //   const { env } = props;
  //
  //   if (env.NODE_ENV !== 'production') {
  //     return null;
  //   }
  //
  //   if (!env.GOOGLE_ANALYTICS_ID) {
  //     return null;
  //   }
  //
  //   const script = `
  //     (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
  //     (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
  //     m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
  //     })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');
  //
  //     ga('create', '${env.GOOGLE_ANALYTICS_ID}', 'auto');
  //     ga('send', 'pageview');
  //   `;
  //
  //   return (
  //     <script dangerouslySetInnerHTML={{ __html: script }} />
  //   );
  // }

  // Injects `window.env`
  const envScript = `window.env=${JSON.stringify(props.env)};`;

  return (
    <html>
      <head>
        <meta charSet="utf-8" />
        <meta httpEquiv="x-ua-compatible" content="ie=edge" />
        <title>{props.title}</title>
        <meta name="description" content="Get Smarter About Your Traffic" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black" />
        <link rel="shortcut icon" href="/favicon.ico" />
        <link rel="apple-touch-icon-precomposed" href="/apple-touch-icon-precomposed.png" />
        <link rel="author" href="/humans.txt" />
        {getCSS()}
        <script dangerouslySetInnerHTML={{ __html: envScript }} />
      </head>

      <body>
        {getScrewIE()}

        <noscript style={{ color: 'red' }}>
          We do not currently support browsers without javascript enabled.
          Please enable javascript and try again. Thank you!
        </noscript>

        <div id="app" dangerouslySetInnerHTML={{ __html: props.html }}></div>

        {getJS()}
      </body>
    </html>
  );
};

Index.propTypes = {
  title: React.PropTypes.string,
  env: React.PropTypes.object,
  html: React.PropTypes.string,
  assets: React.PropTypes.object,
};

module.exports = Index;
