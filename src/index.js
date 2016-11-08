import {waitUntillElementExist, createTooltip, defer} from './helpers';
import Promise from 'bluebird';


let TourState = {};

export function start(steps, {onTourLeave, onTourComplete}={}) {
  TourState = {
    currentStepIndex: 0,
    currentTooltip: null,
    steps,
    onTourLeave,
    onTourComplete
  };  

  createTourStepFlow(steps[0]);
}


export function stop() {

}


function createTourStepFlow(currentStep) {
  let tooltip,
      domElement,
      resolveMeResolver,
      next = defer();

  /**
   * 
   */
  function resolveMe(resolve) {
    resolveMeResolver();
  }


  /**
   * 
   */
  function onUrlChange() {
    const urlToTest = window.location.pathname + window.location.hash,
          matchRegExp = new RegExp(currentStep.url, 'i');

    if (urlToTest.match(matchRegExp)) {
      return;
    }
    document.querySelector('body').removeChild(tooltip);
    domElement.removeEventListener(currentStep.event, resolveMe);
    next.reject();
  }
  window.addEventListener('popstate', onUrlChange);


  /**
   * 
   */

  waitUntillElementExist(currentStep.element)
  .then((localDomElement) => {
    domElement = localDomElement;

    const elementRect = domElement.getBoundingClientRect();
    tooltip = createTooltip({text: currentStep.text, domElement});
    document.querySelector('body').appendChild(tooltip);

    return new Promise((resolve, reject) => {
      resolveMeResolver = resolve;
      domElement.addEventListener(currentStep.event, resolveMe);
    });
  })
  .then(() => {})
  .finally(() => {
    window.removeEventListener('popstate', onUrlChange);
    document.querySelector('body').removeChild(tooltip);
    domElement.removeEventListener(currentStep.event, resolveMe);
    next.resolve();
  });

  return next.promise;
}
