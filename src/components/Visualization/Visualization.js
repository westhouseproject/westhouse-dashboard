import { Component, PropTypes } from 'react';
import d3 from 'd3';

export default class Visualization extends Component {

  static propTypes = {
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
    metrics: PropTypes.array.isRequired
  }

  render() {
    // TODO: refactor this code so that the axis are their own components.

    const margin = { top: 10, right: 30, bottom: 30, left: 30 };
    const {
      metrics,
      width: widthWhole = 0,
      height: heightWhole = 0
    } = this.props;
    // const width = widthWhole > 0 ? widthWhole - margin.left - margin.right : 0;
    const height =
      heightWhole > 0 ? heightWhole - margin.top - margin.bottom : 0;

    if (!metrics.length) {
      return (<div></div>);
    }

    const minTime = metrics[0].values[0].date;
    const maxTime = metrics[0].values[metrics[0].values.length - 1].date;

    const startHour = minTime.getHours();
    const diff = maxTime - minTime;
    const hoursElapsed = Math.floor(diff / (1000 * 60 * 60));

    const min = Math.min(
      metrics[0].values.reduce(
        (prev, { value }) =>
          value < prev ? value : prev,
        metrics[0].values[0].value
      ), metrics[1].values.reduce(
        (prev, next) =>
          next < prev ? next : prev,
        metrics[1].values[0].value
      )
    );

    const max = Math.max(
      metrics[0].values.reduce(
        (prev, { value }) =>
          value > prev ? value : prev,
        metrics[0].values[0].value
      ), metrics[1].values.reduce(
        (prev, next) =>
          next > prev ? next : prev,
        metrics[1].values[0].value
      )
    );

    // const xScale = d3.time.scale()
    //   .domain([minTime, maxTime]).range([0, width]);

    // console.log(max, min);

    const yScale = d3.scale.linear()
      .domain([min, max])
      .range([0, height]);

    const xAxis = (
      <g>
        {Array(hoursElapsed).join(' ').split(' ').map((ignore, i) =>
          (
            <g key={i}>
              <line x2='0' y2='0' />
              <text>{`${i + startHour}`}</text>
            </g>
          )
        )}
      </g>
    );

    const yAxisTicks = 10;

    const yAxis = (
      <g>
        {Array(yAxisTicks).join(' ').split(' ').map((ignore, i) =>
          (
            <g key={i}>
              <line x2='-6' y2='0' />
              <text>{`${(max - min) * ((i + 1) / yAxisTicks) + max}`}</text>
            </g>
          )
        )}
      </g>
    );

    // console.log(yScale(10));
    // console.log(metrics.find(val => val.series === 'energy_consumption'));
    const consumption = (
      metrics
        .find(val => val.series === 'energy_consumption')
        .values
        .map(point => {
          console.log(point.value, yScale(point.value));
          return <rect
            key={point.id}
            fill='#ffffff'
            width={'10px'}
            height={yScale(point.value)} />;
        })
    );

    // console.log(metrics.find(val => val.series === 'energy_pr'))
    const production = (
      metrics.find(val => val.series === 'solar_pv_power').values.map(point => {
        // console.log(yScale());
        console.log(point.value, yScale(point.value));
        return <rect
          key={point.id}
          fill='#ffffff'
          width={'10px'}
          height={yScale(point.value)} />;
      })
    );

    return (
      <svg width={widthWhole} height={heightWhole}>
        {consumption}
        {production}
        {xAxis}
        {yAxis}
      </svg>
    );
  }

}
