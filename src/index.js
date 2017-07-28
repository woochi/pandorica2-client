import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import FastClick from 'fastclick';
import injectTapEventPlugin from 'react-tap-event-plugin';

FastClick.attach(document.body);
injectTapEventPlugin();

ReactDOM.render(<App />, document.getElementById('root'));
  registerServiceWorker();
