import styles from './app.scss';
import React from 'react';
import Helmet from 'react-helmet';

// https://medium.com/@housecor/react-stateless-functional-components-nine-wins-you-might-have-overlooked-997b0d933dbc
const App = (props) => (
  <div>
    <Helmet defaultTitle="Peter Shih" titleTemplate="%s | Peter Shih" />
    <div role="main" className={styles.main}>{props.children}</div>
  </div>
);

App.propTypes = {
  location: React.PropTypes.object,
  history: React.PropTypes.object,
  children: React.PropTypes.oneOfType([
    React.PropTypes.array,
    React.PropTypes.string,
    React.PropTypes.element,
  ]),
};

export default App;
