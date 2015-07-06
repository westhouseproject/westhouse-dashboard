import { createRedux, createDispatcher, composeStores } from 'redux';
import { Provider } from 'redux/react';
import * as stores from '../stores';
import MainContainer from './MainContainer';
import { Router, Route } from 'react-router';
import { history } from 'react-router/lib/BrowserHistory';
import Controls from './Controls';
import Goals from './Goals';

function promiseMiddleware(next) {
  return action =>
    action && typeof action.then === 'function'
      ? action.then(next)
      : next(action);
}

const dispatcher = createDispatcher(
  composeStores(stores),
  [promiseMiddleware]
);
const redux = createRedux(dispatcher);

export default class App {
  render() {
    return (
      <Provider redux={redux}>
        {() =>
          <Router history={history}>
            <Route path='/' component={MainContainer}>
              <Route path='controls' component={Controls} />
              <Route path='goals' component={Goals} />
            </Route>
          </Router>
        }
      </Provider>
    );
  }
}
