import 'babel/polyfill';
import 'normalize.css';
import './styles.less';

import React from 'react';
import App from './components/App';
import Router, { Route, DefaultRoute } from 'react-router';
import Visualization from './components/Visualization';

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

const routes = (
  <Route path='/' handler={App}>
    <DefaultRoute handler={Visualization} />
  </Route>
);

Router.run(routes, Route.HashLocation, (Root) => {
  React.render(<Root />, document.getElementById('container'));
});
