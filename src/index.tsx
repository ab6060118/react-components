import 'core-js/es6/map';
import 'core-js/es6/set';
import * as React from "react";
import * as ReactDOM from "react-dom";
import { HashRouter } from 'react-router-dom'

import App from './container/app';

import './index.scss'

ReactDOM.render(
  <HashRouter>
    <App />
  </HashRouter>,
  document.getElementById('App')
);
