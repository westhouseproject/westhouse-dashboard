import d3 from 'd3';
import { findDOMNode } from 'react';

export default class Axis {
  _drawAxis() {
    d3.select(findDOMNode(this.refs.axis)).call(this.props.axis);
  }

  componentDidMount() {
    this._drawAxis();
  }

  componentDidUpdate() {
    this._drawAxis();
  }

  render() {
    const props =
      (({ className, transform }) => ({className, transform}))(this.props);
    return <g ref='axis' {...props} />;
  }
}
