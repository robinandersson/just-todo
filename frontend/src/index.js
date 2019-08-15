import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.build.css';
import * as serviceWorker from './serviceWorker';

import WebFont from 'webfontloader';

WebFont.load({
  classes: false,
  events: false,
  google: {
    families: [
      'Baumans:300,400,500,600,700',
      'Optima:300,400,500,600,700',
      'Quicksand:300,400,500,600,700',
      'Futura:300,400,500,600,700',
      'Roboto:300,400,500,600,700',
    ],
  },
});

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
