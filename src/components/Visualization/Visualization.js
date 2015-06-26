import React, { Component } from 'react';
import { d3Chart } from './d3Chart';
import './Visualization.less';

export default class Visualization extends Component {
  componentDidMount() {
    const el = React.findDOMNode(this.refs.chartContainer);
    d3Chart.create(el, null, this.props.metrics);
  }

  componentDidUpdate() {
    const el = React.findDOMNode(this.refs.chartContainer);
    el.innerHTML = '';
    d3Chart.create(el, null, this.props.metrics);
  }

  render() {
    const { metrics } = this.props;

    return <div ref='chartContainer' className="Chart" />;
  }
}
