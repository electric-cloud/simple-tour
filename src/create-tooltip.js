export default function createTooltip({text, domElement}) {
  const element = document.createElement('div'),
        textNode = document.createTextNode(text);
  
  element.appendChild(createArrow(domElement));
  element.appendChild(textNode);
  element.className = 'simple-tour-tooltip';

  const styles = getElementPosition(domElement);
  for (let styleName in styles) {
    element.style[styleName] = styles[styleName];   
  }

  return element;
}


function createArrow(domElement) {
  const elementRect = domElement.getBoundingClientRect(),
        arrow = document.createElement('div');

  arrow.className = 'simple-tour-tooltip-arrow';
  if (elementRect.left + 220 > window.innerWidth) {
    arrow.style.right = '20px'; 
  } else {
    arrow.style.left = '20px';
  }
  return arrow;
}


function getElementPosition(domElement) {
  const elementRect = domElement.getBoundingClientRect(),
        styles = {
          top: elementRect.top + 'px',
          left: elementRect.left + 'px',
          marginTop: elementRect.height + 6 + 'px'
        };

  if (elementRect.left + 220 > window.innerWidth) {
    styles.left = elementRect.left - 180 + 'px'; 
  }
  
  return styles;
}
