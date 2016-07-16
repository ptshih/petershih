import styles from './root.scss';
import portrait from './pt-hironan.jpg';

// import _ from 'lodash';
import React from 'react';
import { Link } from 'react-router';
// import Helmet from 'react-helmet';

// http://techcrunch.com/2014/02/05/celery-2m/
const Root = () => (
  <div className={styles.wrapper}>
    <div className="row">
      <div className="col-xs-12">
        <img className={styles.portrait} src={portrait} alt="Peter Shih" />
      </div>
    </div>

    <div className="row m-t-1">
      <div className="col-xs-12">
        <h3>Peter Shih</h3>
      </div>
    </div>

    <div className="row m-t-1">
      <div className="col-xs-12">
        <div className="m-b-1">
          <div>Co-Founder and CTO of <a href="https://www.trycelery.com/">Celery</a> which was <a href="https://techcrunch.com/2016/05/10/sell-your-stuff-after-you-go-go/">acquired by Indiegogo</a> in 2016.</div>
          <div>I was a founder in the <a href="http://www.ycombinator.com/">Y Combinator</a> Summer 2012 batch.</div>
          <div>Previously I was an iOS engineer at <a href="https://www.foursquare.com/">Foursquare</a> and <a href="https://www.linkedin.com/">LinkedIn</a>.</div>
        </div>
        <div className="m-b-1">
          <div>I mostly code in JavaScript now – preferring Node and React.</div>
          <div>I also have a lot of experience with iOS – both native and hybrid apps.</div>
        </div>
        <div className="m-b-1">
          <div>When I'm not coding, I like to watch documentaries about the universe, astrophysics, artificial intelligence, and machine learning on <a href="https://www.thegreatcoursesplus.com/">The Great Courses</a>.</div>
        </div>
        <div className="m-b-1">
          <div>I grew up in <a href="https://en.wikipedia.org/wiki/Palo_Alto,_California">Palo Alto, CA</a> and attended <a href="http://gunn.pausd.org/">Gunn High School</a>.</div>
          <div>I studied <a href="http://ece.ucsd.edu/">Electrical and Computer Engineering</a> at the <a href="http://ucsd.edu/">University of California, San Diego</a>.</div>
        </div>
        <div className="m-b-1">
          <div>I currently spend my time either in NYC or Palo Alto.</div>
        </div>
      </div>
    </div>

    <div className="row m-t-1">
      <div className="col-xs-12">
        <h4>Stack</h4>
        <ul>
          <li>Node.js / Express</li>
          <li>React / Redux</li>
          <li>MongoDB / Mongoose</li>
          <li>ES6 / Babel</li>
          <li>WebSockets / socket.io</li>
          <li>Mocha / Chai</li>
          <li>CSS / SCSS</li>
          <li>ESLint</li>
          <li>Webpack</li>
        </ul>
      </div>
    </div>

    <div className="row m-t-1">
      <div className="col-xs-12">
        <h4>Links</h4>
        <ul>
          <li><a href="https://www.linkedin.com/in/ptshih">LinkedIn</a></li>
          <li><a href="https://www.github.com/ptshih">GitHub</a></li>
        </ul>
      </div>
    </div>

    <div className="row m-t-1">
      <div className="col-xs-12">
        <h4>Projects</h4>
        <ul>
          <li><a href="https://blinkforhome.com/product-pricing">Blink</a> is a great example of Celery in action</li>
          <li><a href="https://www.plugpanda.com">Plug Panda</a> (<a href="https://github.com/ptshih/plugpanda">GitHub</a>) for Electric Vehicles</li>
          <li><Link to="/lunchbox">Lunchbox</Link> for iOS</li>
          <li><a href="https://github.com/airbrite/woodhouse">Woodhouse</a> - view bindings for Backbone.js</li>
        </ul>
      </div>
    </div>
  </div>
);

export default Root;
