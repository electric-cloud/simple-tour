import Promise from 'bluebird';

export function waitUntillElementExist(selector) {
  let timeout = 1000;

  return new Promise((resolve, reject) => {
    const intervalId = setInterval(() => {
      const element = document.querySelector(selector);
      timeout -= 1;
      if (!timeout) {
        clearInterval(intervalId);
        reject(new Error('Element lookup timeout'));
        return;
      }
      if (!element) {
        return;
      }
      clearInterval(intervalId);
      resolve(element);
    }, 200);  
  });
}


export function defer() {
    var resolve, reject;
    var promise = new Promise(function() {
        resolve = arguments[0];
        reject = arguments[1];
    });
    return {
        resolve: resolve,
        reject: reject,
        promise: promise
    };
}
