import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import injectTapEventPlugin from 'react-tap-event-plugin';

injectTapEventPlugin();
let endpoints = {image: 'https://staging.weeb.sh/images', apiAccount: 'https://staging.weeb.sh/accounts'};
ReactDOM.render(<App endpoints={endpoints}/>, document.getElementById('root'));
registerServiceWorker();
