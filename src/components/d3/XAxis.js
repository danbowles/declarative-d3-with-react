import * as d3 from 'd3';

export default function D3XAxis() {
  const axis = d3
    .axisBottom()
    .tickFormat((dataItem) => dataItem)
    .scale(this.props.xScale);

  d3
    .select(this.anchor)
    .classed('xAxis', true)
    .transition()
    .call(axis);
}
