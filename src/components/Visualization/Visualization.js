import React, { Component } from 'react';
import { create as createChart } from './d3Chart';
import './Visualization.less';

export default class Visualization extends Component {
  componentDidMount() {
    const el = React.findDOMNode(this.refs.chartContainer);
    createChart(el, {}, this.props.metrics);
  }

  componentDidUpdate() {
    const el = React.findDOMNode(this.refs.chartContainer);
    el.innerHTML = '';
    createChart(el, {}, this.props.metrics);
  }

  render() {
    const { metrics } = this.props;

    return <div ref='chartContainer' className="Chart" />;
  }
}
