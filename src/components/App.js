import { createRedux } from 'redux';
import { Provider } from 'redux/react';
import * as stores from '../stores';
import MainContainer from './MainContainer';

const redux = createRedux(stores);

export default class App {
  render() {
    return (
      <Provider redux={redux}>
        {() => <MainContainer />}
      </Provider>
    );
  }
}
