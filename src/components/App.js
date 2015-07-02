import { createRedux, createDispatcher, composeStores } from 'redux';
import { Provider } from 'redux/react';
import * as stores from '../stores';
import MainContainer from './MainContainer';

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
        {() => <MainContainer />}
      </Provider>
    );
  }
}
