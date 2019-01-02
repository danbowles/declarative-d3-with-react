import * as d3 from 'd3';

export default function D3Bars() {
  const { plotData, labeled } = this.props;
  const current = d3.select(this.anchor)
    .selectAll('.bar').data(plotData);

  current.interrupt();

  const enter = current.enter().append('g').classed('bar', true);

  enter
    .append('rect')
    .attr('fill', ({ fill }) => fill)
    .attr('height', 0)
    .attr('transform', ({ transform }) => transform);

  if (labeled) {
    // Currently only supports horizontal charts
    enter.append('text')
      .text((dataItem) => dataItem.formatted)
      .attr('x', 10);
  }

  const exit = current.exit().classed('bar', false);
  exit
    .attr('opacity', 1)
    .transition()
    .attr('opacity', 0)
    .remove();

  current
    .merge(enter)
    .select('rect')
    .transition()
    .attr('width', ({ width }) => width)
    .attr('transform', ({ x, y }) => `translate(${x}, ${y})`)
    .attr('height', ({ height }) => height);

  current
    .merge(enter)
    .select('text')
    .transition()
    .attr('y', ({ y, height }) => y + (height / 2) + 6);
}
