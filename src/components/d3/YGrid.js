import * as d3 from 'd3';

export default function D3YGrid() {
  const axis = d3
    .axisRight()
    .tickFormat(() => null)
    .scale(this.props.yScale)
    .tickSizeOuter(0)
    .tickSizeInner(this.props.plotWidth);

  d3
    .select(this.anchor)
    .classed(this.props.className || 'yGrid', true)
    .transition()
    .call(axis);
}