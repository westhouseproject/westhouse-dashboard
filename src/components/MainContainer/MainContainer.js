import 'weather-icons/css/weather-icons.css';

import React, { Component } from 'react';
import { connect } from 'redux/react';
import * as metricsActions from '../../actions/metricsActions';
import * as weatherActions from '../../actions/weatherActions';
import { bindActionCreators } from 'redux';
import Visualization from '../Visualization';
import weatherIconMappings from '../../weatherIconMappings';
import { mainContainer as mainStyle } from './MainContainer.less';
import classnames from 'classnames';

@connect(state => ({ metrics: state.metrics, weather: state.weather }))
export default class MainContainer extends Component {

  constructor() {
    super();

    this.state = {
      width: 0
    };
  }

  componentWillMount() {
    // TODO: move the dispatching of actions out somewhere else.
    const { dispatch } = this.props;
    const { getData: getMetrics } =
      bindActionCreators(metricsActions, dispatch);
    const { getData: getWeather } =
      bindActionCreators(weatherActions, dispatch);

    getMetrics();
    getWeather();
  }

  componentDidMount() {
    setTimeout(() => {
      console.log(React.findDOMNode(this.refs.container).offsetWidth);
      this.setState({
        width: React.findDOMNode(this.refs.container).offsetWidth
      });
    });
  }

  render() {
    console.log(this.state);
    const { metrics, weather, dispatch } = this.props;
    const { width } = this.state;
    const height = document.body.offsetHeight - 100;

    return (
      <div ref='container' className={mainStyle}>
        {
          weather !== null ?
            <div ref='weather'>
              <i className={
                classnames(
                  'wi',
                  `wi-${weatherIconMappings[weather.simplifiedCode]}`
                )
              }></i>
              {`${Math.round(weather.temperature)}\u00B0C`}
            </div> :
            ''
        }
        <Visualization width={width} height={height} metrics={metrics}/>
      </div>
    );
  }
}
