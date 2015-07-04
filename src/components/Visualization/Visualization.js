import { chart as chartStyle } from './Visualization.less';
import { Component, findDOMNode } from 'react';
import d3 from 'd3';
import Axis from './Axis';

// Some constants.
const margin = { top: 20, right: 20, bottom: 30, left: 40 };

export default class Visualization extends Component {

  static defaultProps = {
    height: 500,
    data: []
  }

  constructor(props) {
    super(props);

    this.state = {
      width: props.initialWidth || 960
    };
  }

  _getChartContainer() { return findDOMNode(this.refs.chartContainer); }

  _listenForWidthChange() {
    const onWidthChange = () => {
      requestAnimationFrame(() => {
        const node = this._getChartContainer();
        if (node && node.offsetWidth !== this.state.width) {
          this.setState({
            width: node.offsetWidth
          });
          return;
        }
        onWidthChange();
      });
    };

    onWidthChange();
  }

  componentDidMount() { this._listenForWidthChange(); }
  componentDidUpdate() { this._listenForWidthChange(); }

  render() {
    const { data } = this.props;
    if (data.length === 0) {
      return <p>Currently loading data</p>;
    }

    const width = this.state.width - margin.left - margin.right;
    const height = this.props.height - margin.top - margin.bottom;

    // Think of an ordinal "scale" as a discrete, finite set, countable set.
    // What we are doing here is establishing a mapping from the said set to
    // pixel coordinate.
    const x = d3.scale.ordinal()
      .domain(data.map(({time}) => time))
      .rangeRoundBands([0, width], .1);

    const y = d3.scale.linear()
      .domain([
        d3.min(data, ({production}) => production),
        d3.max(data, ({consumption}) => consumption)
      ])
      .range([height, 0]);

    const xAxis = d3.svg.axis()
      .scale(x)
      .orient('bottom')
      .tickFormat(d3.time.format('%H'));

    const yAxis = d3.svg.axis()
      .scale(y)
      .orient('left')
      .ticks(10);

    const line = d3.svg.line()
      .x(({time}) => x(time) + x.rangeBand() / 2)
      .y(({difference}) => y(difference));

    return (
      <div ref='chartContainer' className={chartStyle}>
        <svg
          width={width + margin.left + margin.right}
          height={height + margin.bottom + margin.top}>
          <g transform={`translate(${margin.left}, ${margin.top})`}>
            <Axis
              className='x axis'
              scale={x}
              transform={`translate(0, ${height})`}
              axis={xAxis} />
            <Axis
              className='y axis'
              scale={y}
              axis={yAxis} />
            {data.map((d, i) => {
              return (
                <g key={i}>
                  <rect
                    x={x(d.time)}
                    width={x.rangeBand()}
                    y={y(d.consumption)}
                    height={y(0) - y(d.consumption)} />
                  <rect
                    className='negative'
                    x={x(d.time)}
                    width={x.rangeBand()}
                    y={y(0)}
                    height={y(d.production) - y(0)} />
                  <circle
                    className='circle'
                    transform={
                      `translate(${x(d.time) + x.rangeBand() / 2}, ${y(d.difference)})`
                    }
                    r={8}
                    />
                </g>
              );
            })}
            <path className='chart-line' d={line(data)}/>
          </g>
        </svg>
      </div>
    );
  }
}
