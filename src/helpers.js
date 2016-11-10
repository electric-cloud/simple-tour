
export function waitUntillElementExist(selector) {
  return new Promise((resolve, reject) => {
    let timeout = 1000;
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
    let resolve, reject;
    const promise = new Promise(function() {
        resolve = arguments[0];
        reject = arguments[1];
    });

    return {
      resolve: resolve,
      reject: reject,
      promise: promise
    };
}
