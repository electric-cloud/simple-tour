export function waitUntillElementExist(selector, done) {
  const intervalId = setInterval(() => {
    const el = document.querySelector(selector);
    if (!el) {
      return;
    }
    clearInterval(intervalId);
    done(el);
  }, 200);  
}

export function createHTMLElement({text, styles, className}) {
  const element = document.createElement('div'),
        textNode = document.createTextNode(text);

  element.appendChild(textNode);
  element.className = className;

  for (let styleName in styles) {
    element.style[styleName] = styles[styleName];   
  }

  return element;
}
