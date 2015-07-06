import d3 from 'd3';
import { findDOMNode } from 'react';

export default class DonutChart {
  _drawChart() {
    const el = d3.select(findDOMNode(this.refs.chart));
    const radius = 90;

    const g1 = el.append('g').attr('transform', 'translate(0, -40)');

    g1.append('text')
      .attr('transform', 'translate(0, 0)')
      .text('You have')
      .style('text-transform', 'uppercase')
      .style('font-size', '15px');

    g1.append('text')
      .text('contributed')
      .attr('transform', 'translate(0, 15)')
      .style('text-transform', 'uppercase')
      .style('font-size', '15px');

    g1.append('text')
      .attr('transform', 'translate(0, 70)')
      .style('text-transform', 'uppercase')
      .style('font-size', '60px')
      .text('20%');

    g1.append('text')
      .attr('transform', 'translate(0, 100)')
      .style('text-transform', 'uppercase')
      .style('font-size', '15px')
      .text('today');

    const arc = d3.svg.arc()
      .outerRadius(radius)
      .innerRadius(radius - 10);

    const pie = d3.layout.pie()
      .sort(null)
      .value(d => d.value);

    const g = el.selectAll('.arc')
      .data(pie([
        { label: 'done', value: 50, fill: '0.5' },
        { label: 'doing', value: 20, fill: '0.9' },
        { label: 'remain', value: 30, fill: '0.2' }
      ]))
      .enter()
        .append('g')
        .attr('class', 'arc');

    g.append('path')
      .attr('d', arc)
      .style('fill', 'white')
      .style('fill-opacity', d => d.data.fill);
  }

  componentDidMount() {
    this._drawChart();
  }

  componentDidUpdate() {
    this._drawChart();
  }

  render() {
    return <g transform='translate(110, 100)' ref='chart' />;
  }
}
