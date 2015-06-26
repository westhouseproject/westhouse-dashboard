import { connect } from 'redux/react';
import * as metricsActions from '../actions/metricsActions';
import { bindActionCreators } from 'redux';

@connect(state => ({ metrics: state.metrics }))
export default class MainContainer {
  componentWillMount() {
    const { dispatch } = this.props;
    const { getData } = bindActionCreators(metricsActions, dispatch);
    getData();
  }

  render() {
    const { metrics, dispatch } = this.props;
    console.log(metrics);
    return (
      <ul>
        {metrics.map(metric => (
          <li key={metric.key}>
            {metric.consumption.value}
          </li>
        ))}
      </ul>
    );
  }
}
