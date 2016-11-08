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

export function createTooltip({text, domElement}) {
  const element = document.createElement('div'),
        textNode = document.createTextNode(text);

  const elementRect = domElement.getBoundingClientRect();
  const styles = {
    top: elementRect.top + 'px',
    left: elementRect.left + 'px',
    marginTop: elementRect.height + 6 + 'px'
  };

  element.appendChild(textNode);
  element.className = 'simple-tour-tooltip';

  for (let styleName in styles) {
    element.style[styleName] = styles[styleName];   
  }

  return element;
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
