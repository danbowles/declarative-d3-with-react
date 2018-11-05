import * as d3 from 'd3';

export default function D3ScatterPlot() {
  const current = d3.select(this.anchor)
    .selectAll('.dot')
    .data(this.props.plotData, ({ data }) => data.year);

  const enter = current.enter().append('g').classed('dot', true);

  enter.append('circle')
    .attr('fill', 'blue')
    .attr('cx', ({ x }) => x)
    .attr('cy', ({ y }) => y)
    .attr('r', 5);

  current
    .exit()
    .attr('opacity', 1)
    .transition()
    .attr('opacity', 0)
    .remove();

  current
    .merge(enter)
    .select('circle')
    .on('mouseover', (dataItem, index, circles) => {
      const circle = d3.select(circles[index]);
      circle
        .transition()
        .attr('r', 8);
    })
    .on('mouseout', (dataItem, index, circles) => {
      const circle = d3.select(circles[index]);
      circle
        .transition()
        .attr('r', 5);
    })
    .transition()
    .attr('cx', ({ x }) => x)
    .attr('cy', ({ y }) => y)
    .attr('r', 5);
}