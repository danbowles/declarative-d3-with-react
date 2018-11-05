import * as d3 from 'd3';
import { interpolatePath } from 'd3-interpolate-path';

export default function D3Line() {
  const current = d3.select(this.anchor)
    .selectAll('path')
    .data([this.props.plotData]);

  current.interrupt();

  const path = d3.line()
    .x(({ x }) => x)
    .y(({ y }) => y)
    .curve(d3.curveMonotoneX);

  const pathData = path(this.props.plotData);

  const enter = current.enter();

  enter.append('path')
    .attr('d', pathData)
    .attr('fill', 'none')
    .attr('stroke', 'blue');

  current
    .merge(current)
    .transition()
    .attrTween('d', function attrTween(dataItem) {
      const previous = d3.select(this).attr('d');
      const newLine = path(dataItem);
      return interpolatePath(previous, newLine);
    });
}
