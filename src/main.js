import 'babel/polyfill';

import React from 'react';
import App from './components/App';
import { getData } from './actions/metricsActions';

getData();

React.render(
  <App />,
  document.getElementById('container')
);
