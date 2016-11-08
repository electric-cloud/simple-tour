import {waitUntillElementExist, createHTMLElement} from './helpers';

let globalSteps,
    globalOnTourLeave,
    globalOnTourComplete,
    currentTooltip,
    globalCurrentStepIndex = 0;


export function start(steps, {onTourLeave, onTourComplete}={}) {
  globalSteps = steps;
  globalOnTourLeave = onTourLeave;
  globalOnTourComplete = onTourLeave;
  
  showCurrenStep();
}


export function stop() {
  globalSteps = null;
  globalCurrentStepIndex = 0;
  document.querySelector('body').removeChild(currentTooltip);
  window.removeEventListener('popstate', onUrlChange);
}


function onUrlChange(onTourLeave) {
  const currentStep = globalSteps[globalCurrentStepIndex],
        urlToTest = window.location.pathname + window.location.hash,
        matchRegExp = new RegExp(currentStep.url, 'i');

  if (urlToTest.match(matchRegExp)) {
    return;
  }

  console.log('url not match anymore', urlToTest, matchRegExp);
  stop();
}


function showCurrenStep() {
  window.removeEventListener('popstate', onUrlChange);
  const currentStep = globalSteps[globalCurrentStepIndex];
  if (!currentStep) {
    if (globalOnTourComplete) {
      globalOnTourComplete();
    }
    return;
  }

  waitUntillElementExist(globalSteps[globalCurrentStepIndex].element, onElementFound);
}


function onElementEvent(e) {
  e.target.removeEventListener(e.type, onElementEvent);
  document.querySelector('body').removeChild(currentTooltip);
  globalCurrentStepIndex += 1;
  showCurrenStep();
}


function onElementFound(el) {
  const currentStep = globalSteps[globalCurrentStepIndex],
        elementRect = el.getBoundingClientRect();

  currentTooltip = createHTMLElement({
    text: currentStep.text,
    className: 'simple-tour-tooltip',
    styles: {
      top: elementRect.top + 'px',
      left: elementRect.left + 'px',
      marginTop: elementRect.height + 6 + 'px'
    }
  });
  document.querySelector('body').appendChild(currentTooltip);
  
  el.addEventListener(currentStep.event, onElementEvent);
  window.addEventListener('popstate', onUrlChange);
}
