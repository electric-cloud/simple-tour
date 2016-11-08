export default function createTooltip({text, domElement}) {
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


function findTooltipDisplayPositionSpot(domElement) {

}
