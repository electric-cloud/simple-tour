# Simple Tour
Just a tour. Primises based simple JavaScript Tour.


##How to use
You need to have any kind of Promise object in window scope.
For example you can add or use your dependency management tool to add it.

```html
<script src="//cdn.jsdelivr.net/bluebird/3.4.5/bluebird.min.js"></script>
``` 

###Simple JavaScript, no dependency management

```js
  //<script type="text/javascript" src="../dist/simple-tour.js"></script>

  window.simpleTour.start([
    {
      url: '/demo/#test',
      element: '.at-cls-1',
      position: 'bottom',
      text: 'Text 1',
      event: 'click'
    },
    {
      url: '/demo/#test2',
      element: '.at-cls-1',
      position: 'bottom',
      text: 'Text 2',
      event: 'click'
    },
    {
      url: /\/demo\/\#.+$/i,
      element: '.at-cls-2',
      position: 'bottom',
      text: 'Text 3',
      event: 'click'
    }
  ]);
```


###Webpack, browserify
```js
import simpleTour from 'simpleTour';

simpleTour.start([...]);
```


###Require.js
```js
//config.js
paths: {
  'simpleTour': '<path-to-node_modules>/node_modules/simple-tour/dist/simple-tour'
}

//my-file.js
define((require) => {
  var simpleTour = require('simpleTour');

  simpleTour.start([...]);
});
```