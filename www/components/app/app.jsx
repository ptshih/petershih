import styles from './app.scss';
import React from 'react';
import Helmet from 'react-helmet';

// https://medium.com/@housecor/react-stateless-functional-components-nine-wins-you-might-have-overlooked-997b0d933dbc
const App = (props) => {
  return (
    <div>
      <Helmet
        defaultTitle={props.route.title}
        titleTemplate={`%s | ${props.route.title}`}
        meta={[
          { name: 'description', content: props.route.description },
          { property: 'og:type', content: 'article' },
        ]}
      />
      <div role="main" className={styles.main}>{props.children}</div>
    </div>
  );
};

App.propTypes = {
  location: React.PropTypes.object,
  history: React.PropTypes.object,
  route: React.PropTypes.object,
  children: React.PropTypes.oneOfType([
    React.PropTypes.array,
    React.PropTypes.string,
    React.PropTypes.element,
  ]),
};

export default App;
