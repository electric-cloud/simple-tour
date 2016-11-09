import {waitUntillElementExist, defer} from './helpers';
import createTooltip from './create-tooltip';
import Promise from 'bluebird';


export function start(steps, {onTourLeave, onTourComplete}={}) {
  let flow;

  /**
   * Go over all steps and create list of tour promises
   */
  for(let i = 0; i < steps.length; i++) {
    if (!flow) {
      flow = createTourStepFlow(steps[i]);
    } else {
      flow = flow.then(() => {
        return createTourStepFlow(steps[i]);
      });
    }
  }

  flow.then(() => {
    if (onTourComplete) {
      onTourComplete();
    }
  });
  flow.catch(() => {
    if (onTourLeave) {
      onTourLeave();
    }
  });
}


/**
 * 
 */
function createTourStepFlow(currentStep) {
  let tooltip,
      domElement,
      resolveMeResolver,
      next = defer();

  /**
   * Resolver event listener function.
   * Needed for removeEventListener.
   */
  function resolveMe(resolve) {
    resolveMeResolver();
  }


  /**
   * Checks url change to match valid path
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
   * Create promises tour step chain
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
