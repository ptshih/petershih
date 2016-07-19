import styles from './root.scss';
import portrait from './pt-hironan.jpg';

// import _ from 'lodash';
import React from 'react';
import Helmet from 'react-helmet';
// import { Link } from 'react-router';

// Redux
import { asyncConnect } from 'redux-connect';
// import { mapStateToProps, mapDispatchToProps, selector } from './redux';

// http://techcrunch.com/2014/02/05/celery-2m/

export class Root extends React.Component {
  static propTypes = {
    contact: React.PropTypes.object,
  }

  getStack() {
    const items = this.props.contact.stack.map((text, idx) => <li key={idx}>{text}</li>);

    return (
      <ul>
        {items}
      </ul>
    );
  }

  getLinks() {
    const items = this.props.contact.links.map((link, idx) => <li key={idx}><a href={link.url}>{link.text}</a></li>);

    return (
      <ul>
        {items}
      </ul>
    );
  }

  getProjects() {
    const items = this.props.contact.projects.map((project, idx) => <li key={idx}><a href={project.url}>{project.text}</a> - {project.description}</li>);

    return (
      <ul>
        {items}
      </ul>
    );
  }

  render() {
    return (
      <div className={styles.wrapper}>
        <Helmet title="" />

        <div className="row">
          <div className="col-xs-12">
            <img className={styles.portrait} src={portrait} alt="Peter Shih" />
          </div>
        </div>

        <div className="row m-t-1">
          <div className="col-xs-12">
            <h3>{this.props.contact.first_name} {this.props.contact.last_name}</h3>
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
              <div>I mostly code in JavaScript now – preferring <strong>Node</strong> and <strong>React</strong>.</div>
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
            {this.getStack()}
          </div>
        </div>

        <div className="row m-t-1">
          <div className="col-xs-12">
            <h4>Links</h4>
            {this.getLinks()}
          </div>
        </div>

        <div className="row m-t-1">
          <div className="col-xs-12">
            <h4>Projects</h4>
            {this.getProjects()}
          </div>
        </div>
      </div>
    );
  }
}

export default asyncConnect([{
  key: 'contact',
  promise: ({ params, helpers }) => helpers.api.request({
    path: '/contacts/peter',
  }),
}])(Root);
