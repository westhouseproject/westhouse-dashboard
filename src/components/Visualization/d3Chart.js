import d3 from 'd3';

function scales(propWidth, propHeight) {
  const margin = {top: 20, right: 20, bottom: 30, left: 50};
  const width = propWidth - margin.left - margin.right;
  const height = propHeight - margin.top - margin.bottom;

  const x = d3.time.scale()
      .range([0, width]);

  const y = d3.scale.linear()
      .range([height, 0]);

  const xAxis = d3.svg.axis()
      .scale(x)
      .orient('bottom');

  const yAxis = d3.svg.axis()
      .scale(y)
      .orient('left');

  const line = d3.svg.line()
      .x(function(d) { return x(d.date); })
      .y(function(d) { return y(d.value); });

  return { margin, width, height, x, y, xAxis, yAxis, line };
}

export function create(el, { width = 960, height = 500}, data) {
  const svg = d3.select(el).append('svg').append('g').attr('class', 'parent');
  svg.append('g').attr('class', 'x axis');
  svg.append('g').attr('class', 'y axis');
  svg.append('path').attr('class', 'line');
  update(el, { width, height }, data);
}

export function update(
  el, { width: propWidth = 960, height: propHeight = 500}, data
) {
  const {
    margin,
    width,
    height,
    x,
    y,
    xAxis,
    yAxis,
    line
  } = scales(propWidth, propHeight);

  const parentSVG = d3.select(el).select('svg')
    .attr('width', width + margin.left + margin.right)
    .attr('height', height + margin.top + margin.bottom);

  const svg = parentSVG.select('.parent')
      .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

  x.domain(d3.extent(data, function(d) { return d.date; }));
  y.domain(d3.extent(data, function(d) { return d.value; }));

  svg.select('.x.axis')
      .attr('transform', 'translate(0,' + height + ')')
      .call(xAxis);

  svg.select('.y.axis')
      .call(yAxis);

  svg.select('.line')
      .datum(data)
      .attr('d', line);
}
