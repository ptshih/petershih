import nconf from 'nconf';
import mongoose from 'mongoose';
mongoose.Promise = require('bluebird');

import debug from 'modules/debug';

module.exports = {
  connect() {
    const user = nconf.get('MONGODB_USER');
    const password = nconf.get('MONGODB_PASSWORD');
    const url = nconf.get('MONGODB_URL');

    if (!url) {
      debug.info('MongoDB URL not specified.');
      return;
    }

    const connectionUrl = user && password ? `mongodb://${user}:${password}@${url}` : `mongodb://${url}`;
    mongoose.connect(connectionUrl);
    mongoose.connection.once('open', () => {
      debug.info('MongoDB Connection Open');
    });
    mongoose.connection.on('error', () => {
      debug.error('MongoDB Connection Error');
    });
  },
};
