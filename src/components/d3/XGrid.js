import * as d3 from 'd3';

export default function D3XGrid() {
  const axis = d3
    .axisBottom()
    .tickFormat(() => null)
    .scale(this.props.xScale)
    .tickSizeOuter(0)
    .tickSizeInner(this.props.plotHeight);

  d3
    .select(this.anchor)
    .classed('xGrid', true)
    .transition()
    .call(axis);
}
