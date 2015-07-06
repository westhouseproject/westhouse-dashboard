import d3 from 'd3';
import { findDOMNode } from 'react';

export default class Axis {

  static defaultProps = {
    callback: () => {}
  }

  _drawAxis() {
    const el = d3.select(findDOMNode(this.refs.axis)).call(this.props.axis);
    this.props.callback(el);
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
