import { connect } from 'redux/react';
import * as metricsActions from '../actions/metricsActions';
import { bindActionCreators } from 'redux';
import Visualization from './Visualization';

@connect(state => ({ metrics: state.metrics }))
export default class MainContainer {
  componentWillMount() {
    const { dispatch } = this.props;
    const { getData } = bindActionCreators(metricsActions, dispatch);
    getData();
  }

  render() {
    const { metrics, dispatch } = this.props;

    return <Visualization metrics={metrics}/>;
  }
}
