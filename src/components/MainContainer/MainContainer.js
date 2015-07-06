import 'loaders.css/loaders.css';
import './loaders-hack.less';
import 'weather-icons/css/weather-icons.css';

import { Component } from 'react';
import { connect } from 'redux/react';
import * as utilityActions from '../../actions/utilityActions';
import * as weatherActions from '../../actions/weatherActions';
import { bindActionCreators } from 'redux';
import Visualization from '../Visualization';
import weatherIconMappings from '../../weatherIconMappings';
import { mainContainer as mainStyle } from './MainContainer.less';
import LoadingIndicator from '../LoadingIndicator';
import classnames from 'classnames';
import { visualizationPadding } from '../../constants/styles';

@connect(state => ({ utility: state.utility, weather: state.weather }))
export default class MainContainer extends Component {

  componentWillMount() {
    const { dispatch } = this.props;
    const { getData: getUtilityData } =
      bindActionCreators(utilityActions, dispatch);
    const { getData: getWeather } =
      bindActionCreators(weatherActions, dispatch);

    getUtilityData();
    getWeather();
  }

  render() {
    const { utility, weather, dispatch } = this.props;

    const content = (() => {
      if (utility === null || weather === null) { return <LoadingIndicator />; }

      const weatherIconClass =
        `wi-${weatherIconMappings[weather.simplifiedCode]}`;

      return (
        <div>
          <div className='weather-widget'>
            <i className={classnames('wi', weatherIconClass)} />
            {' '}
            <span>{`${Math.round(weather.temperature)}\u00B0C`}</span>
          </div>
          <div
            style={{ paddingTop: `${visualizationPadding}px` }}
            className='visualization'>
            <Visualization data={utility} />
          </div>
          <div>
            
          </div>
        </div>
      );
    })();

    return <div ref='container' className={mainStyle}>{content}</div>;
  }
}
