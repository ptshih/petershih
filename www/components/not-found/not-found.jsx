// import _ from 'lodash';
import React from 'react';
import Helmet from 'react-helmet';

const NotFound = () => (
  <div>
    <Helmet title="Page Not Found" />

    <div className="section">
      <div className="text-xs-center">
        <h3>We can't seem to find the page you're looking for...</h3>
        <div className="m-t-3">
          <img className="img" src="/img/problem.png" role="presentation" />
        </div>
      </div>
    </div>
  </div>
);

export default NotFound;
