import 'babel/polyfill';
import 'normalize.css';
import './styles.less';

import React from 'react';
import App from './components/App';

React.render(
  <App />,
  document.getElementById('container')
);
