import * as d3 from 'd3';

export default function D3Arcs() {
  const { plotData, arc } = this.props;
  const color = d3.scaleOrdinal(d3.schemePastel1);
  const pie = d3.pie()
    .value(({ value }) => value)
    .sort(null);

  const current = d3.select(this.anchor).datum(plotData)
    .selectAll('.arc')
    .data(pie);

  const enter = current.enter().append('g').classed('arc', true);

  enter
    .append('path')
    .attr('fill', (dataItem, index) => color(index))
    .attr('d', arc);

  current.exit()
    .transition()
    .attrTween('d', function attrTween(dataItem) {
      const previous = d3.select(this).attr('d');
      const newLine = arc(dataItem);
      return interpolatePath(previous, newLine);
    })
    .remove();

  current
    .merge(enter)
    .select('path')
    .transition()
    .attr('fill', (dataItem, index) => color(index))
    .attrTween('d', function attrTween(dataItem) {
      const previous = d3.select(this).attr('d');
      const newLine = arc(dataItem);
      return interpolatePath(previous, newLine);
    });
}
