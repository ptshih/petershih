import _ from 'lodash';
import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const schema = new Schema({
  email: {
    type: String,
    trim: true,
    lowercase: true,
    validate(val) {
      if (val.match(/^(|(([A-Za-z0-9]+_+)|([A-Za-z0-9]+\-+)|([A-Za-z0-9]+\.+)|([A-Za-z0-9]+\++))*[A-Za-z0-9]+@((\w+\-+)|(\w+\.))*\w{1,63}\.[a-zA-Z]{2,12})$/i)) {
        return true;
      }

      return false;
    },
  },
  first_name: {
    type: String,
  },
  last_name: {
    type: String,
  },
  photo: {
    type: String,
    trim: true,
    lowercase: true,
  },
  bio: {
    type: String,
  },
  stack: [String],
  links: [{
    text: {
      type: String,
      trim: true,
    },
    url: {
      type: String,
      trim: true,
      lowercase: true,
    },
  }],
  projects: [{
    text: {
      type: String,
      trim: true,
    },
    url: {
      type: String,
      trim: true,
      lowercase: true,
    },
    description: {
      type: String,
      trim: true,
    },
  }],
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  },
});

// Omit fields in response
schema.set('toJSON', {
  transform(doc, ret) {
    return _.omit(ret, [
      '__v',
    ]);
  },
});

/* Plugins */

/* Indexes */

schema.index({
  email: 1,
}, {
  unique: true,
});
schema.set('autoIndex', process.env.NODE_ENV !== 'production');

module.exports = mongoose.model('Contact', schema);
