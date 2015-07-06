import 'babel/polyfill';
import 'normalize.css';
import './styles.less';

import React from 'react';
import App from './components/App';
import Router, { Route, DefaultRoute } from 'react-router';
import Visualization from './components/Visualization';
import Controls from './components/Controls';
import Goals from './components/Goals';

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
  <Route path='/' handler={App} ignoreScrollBehavior>
    <DefaultRoute handler={Visualization} />
    <Route path='controls' handler={Controls} />
    <Route path='goals' handler={Goals} />
  </Route>
);

Router.run(routes, Route.HashLocation, (Root) => {
  console.log('Rendering');
  React.render(<Root />, document.getElementById('container'));
});
