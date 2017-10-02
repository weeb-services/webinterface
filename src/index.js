import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import injectTapEventPlugin from 'react-tap-event-plugin';

injectTapEventPlugin();
let endpoints = {
    image: 'http://localhost:9000',
    apiAccount: 'http://localhost:9010',
    discordData: 'http://localhost:9012'
};
ReactDOM.render(<App endpoints={endpoints}/>, document.getElementById('root'));
registerServiceWorker();
