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

  function getInitialState() {
    // Get the app js url from webpack assets
    const initialState = `window.__INITIAL_STATE__=${JSON.stringify(props.initialState)};`;

    return <script dangerouslySetInnerHTML={{ __html: initialState }} />;
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

  return (
    <html {...props.head.htmlAttributes.toComponent()}>
      <head>
        {props.head.title.toComponent()}
        <meta charSet="utf-8" />
        <meta httpEquiv="x-ua-compatible" content="ie=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black" />
        {props.head.meta.toComponent()}
        <link rel="shortcut icon" href="/favicon.ico" />
        <link rel="apple-touch-icon-precomposed" href="/apple-touch-icon-precomposed.png" />
        <link rel="author" href="/humans.txt" />
        {props.head.link.toComponent()}
        {getCSS()}
      </head>

      <body>
        {getScrewIE()}

        <noscript style={{ color: 'red' }}>
          We do not currently support browsers without javascript enabled.
          Please enable javascript and try again. Thank you!
        </noscript>

        <div id="app" dangerouslySetInnerHTML={{ __html: props.html }}></div>

        {getInitialState()}
        {getJS()}
      </body>
    </html>
  );
};

Index.propTypes = {
  env: React.PropTypes.object,
  head: React.PropTypes.object,
  html: React.PropTypes.string,
  assets: React.PropTypes.object,
  initialState: React.PropTypes.object,
};

module.exports = Index;
