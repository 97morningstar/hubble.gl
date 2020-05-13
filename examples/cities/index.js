import React from 'react';
import {Provider} from 'react-redux';
import {render} from 'react-dom';
import store from './store';
import App from './app';

const Root = () => (
  <Provider store={store}>
    <App location={{query: {}}} />
  </Provider>
);

render(<Root />, document.body.appendChild(document.createElement('div')));
