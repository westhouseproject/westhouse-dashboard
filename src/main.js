import 'babel/polyfill';
import 'normalize.css';
import './styles.less';

import React from 'react';
import App from './components/App';

import querystring from 'querystring';
import { elasticsearchProxyHost } from './config';

(async function () {
  const query = querystring.stringify({
    query: btoa(JSON.stringify({
      query: {
        filtered: {
          filter: {
            range: {
              time: {
                gte: 'now-1d'
              }
            },
          }
        }
      },
      aggs: {
        series: {
          terms: { field: 'series' },
          aggs: {
            values: {
              sum: { field: 'value' }
            }
          }
        },
      }
    }))
  });

  const response = await fetch(
    `http://${elasticsearchProxyHost}/jdbc/_search?${query}`
  );

  const data = await response.json();
  console.log(data);
})();

React.render(
  <App />,
  document.getElementById('container')
);
