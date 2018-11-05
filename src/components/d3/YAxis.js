import * as d3 from 'd3';

export default function D3YAxis() {
  const axis = d3
    .axisLeft()
    .tickFormat((dataItem) => dataItem)
    .scale(this.props.yScale);

  d3
    .select(this.anchor)
    .classed('yAxis', true)
    .transition()
    .call(axis);
}
