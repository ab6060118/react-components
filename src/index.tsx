// import 'core-js/es6/map';
// import 'core-js/es6/set';
import * as React from "react";
import * as ReactDOM from "react-dom";
import { HashRouter } from 'react-router-dom'
import { applyMiddleware, createStore } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';

import reducers from './reducers';

import App from './container/app';

import './index.scss'

const store = createStore(
  reducers,
  applyMiddleware(thunk, logger)
)

ReactDOM.render(
  <Provider store={store}>
    <HashRouter>
      <App />
    </HashRouter>
  </Provider>,
  document.getElementById('App')
);
