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
import { topPadding, bottomPadding } from '../../constants/styles';
import { Link } from 'react-router';

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
    const { utility, weather } = this.props;


    const content = (() => {
      if (utility === null || weather === null) {
        return <LoadingIndicator animationKey='line-scale' />;
      }

      const weatherIconClass =
        `wi-${weatherIconMappings[weather.simplifiedCode]}`;

      const mainBody =
        this.props.children ?
          this.props.children :
          <Visualization data={utility} />;

      return (
        <div>
          <div className='weather-widget'>
            <i className={classnames('wi', weatherIconClass)} />
            {' '}
            <span>{`${Math.round(weather.temperature)}\u00B0C`}</span>
          </div>
          <div
            style={{
              paddingTop: `${topPadding}px`,
              bottomPadding: `${bottomPadding}px`
            }}
            className='view-container'>
            {mainBody}
          </div>
          <div className='navigation'>
            <ul>
              <li>
                <Link to='/' activeClassName='active-link'>Main</Link>
              </li>
              <li>
                <Link to='/controls' activeClassName='active-link'>
                  Controls
                </Link>
              </li>
            </ul>
          </div>
        </div>
      );
    })();

    return <div ref='container' className={mainStyle}>{content}</div>;
  }
}
