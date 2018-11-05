import * as d3 from 'd3';

export default function D3Bars() {
  const current = d3.select(this.anchor)
    .selectAll('.bar').data(this.props.plotData);

  current.interrupt();

  const enter = current.enter().append('g').classed('bar', true);

  enter
    .append('rect')
    .attr('fill', 'blue')
    .attr('height', 0)
    .attr('transform', ({ x }) => `translate(${x}, ${this.props.plotHeight})`);

  const exit = current.exit().classed('bar', false);
  exit
    .attr('fill', 'red')
    .attr('opacity', 1)
    .transition()
    .attr('opacity', 0)
    .remove();

  current
    .merge(enter)
    .select('rect')
    .attr('width', ({ width }) => width)
    .transition()
    .attr('transform', ({ x, y }) => `translate(${x}, ${y})`)
    .attr('height', ({ height }) => height);
}
