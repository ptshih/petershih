import nconf from 'nconf';
import mongoose from 'mongoose';
mongoose.Promise = require('bluebird');

module.exports = {
  connect() {
    const user = nconf.get('MONGODB_USER');
    const password = nconf.get('MONGODB_PASSWORD');
    const url = nconf.get('MONGODB_URL');

    if (!url) {
      console.error('├── MongoDB URL not specified, discarding connection...');
      return;
    }

    const connectionUrl = user && password ? `mongodb://${user}:${password}@${url}` : `mongodb://${url}`;
    mongoose.connect(connectionUrl);
    mongoose.connection.once('open', () => {
      console.log('├── MongoDB Connection Open');
    });
    mongoose.connection.on('error', () => {
      console.error('├── MongoDB Connection Error');
    });
  },
};
