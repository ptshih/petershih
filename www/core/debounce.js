/**
 * Lodash _.debounce
 * https://github.com/lodash/lodash/blob/4.3.0/lodash.js#L8577
 */

const Promise = require('bluebird');

module.exports = (thenable, wait) => {
  if (typeof thenable !== 'function') {
    throw new Error('Parameter `thenable` must be a function.');
  }
  wait = parseInt(wait, 10) || 0;
  let timer;
  let deferred;

  const debounced = () => {
    const args = arguments;

    return new Promise((resolve) => {
      deferred = resolve;

      if (timer) {
        clearTimeout(timer);
      }

      timer = setTimeout(() => {
        timer = null;
        deferred = null;
        return resolve();
      }, wait);
    }).then(() => thenable.apply(thenable, args));
  };

  debounced.cancel = () => {
    if (timer) {
      clearTimeout(timer);
    }
  };

  debounced.flush = () => {
    if (timer && deferred) {
      clearTimeout(timer);
      deferred();
    }
  };

  return debounced;
};
