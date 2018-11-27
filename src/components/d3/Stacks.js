import * as d3 from 'd3';

export default function D3Stacks() {
  const {
    stack,
    keyScale,
    xScale,
    yScale,
    xFn,
  } = this.props;

  const gBars = d3.select(this.anchor)
    .selectAll('g')
    .data(stack);

  const bars = gBars
    .enter()
    .append('g')
    .merge(gBars)
    .attr('fill', (dataItem) => keyScale(dataItem.key))
    .selectAll('rect')
    .data((dataItem) => dataItem);

  gBars.exit().remove();

  const barsEnter = bars
    .enter()
    .append('rect')
    .attr('x', ({ data }) => xScale(xFn(data)))
    .attr('y', (dataItem) => yScale(dataItem[1]));

  bars.exit()
    .attr('opacity', 1)
    .transition()
    .attr('opacity', 0)
    .remove();

  barsEnter
    .merge(bars)
    .transition()
    .attr('x', ({ data }) => xScale(xFn(data)))
    .attr('y', (dataItem) => yScale(dataItem[1]))
    .attr('height', (dataItem) => yScale(dataItem[0]) - yScale(dataItem[1]))
    .attr('width', xScale.bandwidth());

  // d3.select(this.anchor)
  //   .append('g')
  //   .selectAll('g')
  //   .data(stack)
  //   .enter()
  //   .append('g')
  //   .attr('fill', (dataItem) => keyScale(dataItem.key))
  //   .selectAll('rect')
  //   .data((dataItem) => dataItem)
  //   .enter()
  //   .append('rect')
  //   .attr('x', ({ data }) => xScale(xFn(data)))
  //   .attr('y', (dataItem) => yScale(dataItem[1]))
  //   .attr('height', (dataItem) => yScale(dataItem[0]) - yScale(dataItem[1]))
  //   .attr('width', xScale.bandwidth());
}
