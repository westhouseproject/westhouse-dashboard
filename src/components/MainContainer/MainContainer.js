import 'loaders.css';
import './loaders-hack.less';
import 'weather-icons/css/weather-icons.css';

import { Component } from 'react';
import { connect } from 'redux/react';
import * as metricsActions from '../../actions/metricsActions';
import * as weatherActions from '../../actions/weatherActions';
import { bindActionCreators } from 'redux';
import Visualization from '../Visualization';
import weatherIconMappings from '../../weatherIconMappings';
import { mainContainer as mainStyle } from './MainContainer.less';
import LoadingIndicator from '../LoadingIndicator';
import classnames from 'classnames';

function utilityUnion(consumption, production) {
  const hash = {};
  consumption.forEach((con) => {
    hash[con.id] = {
      consumption: con.value,
      time: con.date,
    };
  });
  production.forEach((prod) => {
    if (typeof hash[prod.id] === 'undefined') {
      hash[prod.id] = {
        production: -prod.value,
        consumption: 0,
        difference: prod.value,
        time: prod.date
      };
      return;
    }
    if (typeof hash[prod.id].consumption === 'undefined') {
      hash[prod.id].consumption = 0;
    }
    hash[prod.id].production = prod.value;
    hash[prod.id].difference = hash[prod.id].consumption + prod.value;
  });
  const merged = Object
    .keys(hash)
    .map(key => hash[key])
    .map(point => {
      if (typeof point.production === 'undefined') {
        return {
          ...point,
          production: 0,
          difference: point.consumption
        };
      }
      return point;
    })
    .sort((a, b) => a.time - b.time);

  return merged;
}

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

  render() {
    // console.log(this.state);
    const { metrics, weather, dispatch } = this.props;
    // const height = document.body.offsetHeight - 100;

    const content = (() => {
      if (metrics === null || weather === null) {
        return <LoadingIndicator />;
      }

      // <Visualization width={width} height={height} metrics={metrics}/>

      const consumption = metrics.filter(
        metric => metric.series === 'energy_consumption'
      );
      if (consumption.length === 0) { return <div />; }
      const production = metrics.filter(
        metric => metric.series === 'solar_pv_power'
      );
      if (production.length === 0) { return <div />; }

      const merged = utilityUnion(consumption[0].values, production[0].values);

      return (
        <div>
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
          <Visualization data={merged} />
        </div>
      );
    })();

    return (
      <div ref='container' className={mainStyle}>
        {content}
      </div>
    );
  }
}
