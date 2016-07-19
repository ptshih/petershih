/**
 * Local Storage wrapper
 *
 * https://github.com/marcuswestin/store.js
 */

import store from 'store';

export default {
  set(key, val, exp) {
    store.set(key, {
      val,
      exp,
      time: new Date().getTime(),
    });
  },

  get(key) {
    const info = store.get(key);
    if (!info) {
      return null;
    }
    if (info.exp && new Date().getTime() - info.time > info.exp) {
      return null;
    }
    return info.val;
  },

  remove(key) {
    return store.remove(key);
  },
};
