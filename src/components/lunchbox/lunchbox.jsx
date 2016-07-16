import styles from './lunchbox.scss';

import React from 'react';
import { Link } from 'react-router';

const Lunchbox = () => (
  <div className={styles.wrapper}>
    <div className="row">
      <div className="col-xs-12">
        <Link to="/">Back</Link>
      </div>
    </div>

    <div className="row m-t-1">
      <div className="col-xs-12">
        <div>Lunchbox was built for the iPhone and iPad in 2012.</div>
        <div>I open sourced the Pinterest style rendering code on <a href="https://github.com/impeterstone/pscollectionview">GitHub</a>.</div>
      </div>
    </div>

    <div className="row m-t-1">
      <div className="col-xs-12">
        <h3>Search for Nearby Venues</h3>
        <img className={styles.screenshot} src="/img/lunchbox/gallery.jpg" alt="Gallery" />
      </div>
    </div>

    <div className="row m-t-1">
      <div className="col-xs-12">
        <h3>View a Venue</h3>
        <img className={styles.screenshot} src="/img/lunchbox/venue.jpg" alt="Venue" />
      </div>
    </div>

    <div className="row m-t-1">
      <div className="col-xs-12">
        <h3>View Tips for a Venue</h3>
        <img className={styles.screenshot} src="/img/lunchbox/tips.jpg" alt="Tips" />
      </div>
    </div>
  </div>
);

export default Lunchbox;
