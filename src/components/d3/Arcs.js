import * as d3 from 'd3';
// import { interpolatePath } from 'd3-interpolate-path';

function colors(index) {
  const colorArray = [
    '#e53935',
    '#d81b60',
    '#8e24aa',
    '#5e35b1',
    '#3949ab',
    '#1e88e5',
    '#039be5',
    '#00acc1',
    '#00897b',
    '#43a047',
    '#7cb342',
    '#c0ca33',
    '#fdd835',
    '#ffb300',
    '#fb8c00',
    '#f4511e',
  ];
  return colorArray[index % colorArray.length];
}

export default function D3Arcs() {
  const { plotData, arc } = this.props;
  const pie = d3.pie()
    .value(({ value }) => value)
    .sort(null);

  const current = d3.select(this.anchor).datum(plotData)
    .selectAll('.arc')
    .data(pie);

  const enter = current.enter().append('g').classed('arc', true);

  enter
    .append('path')
    .attr('fill', (dataItem, index) => colors(index))
    .attr('d', arc)
    .each((dataItem) => { this.currentPath = dataItem; });

  current.exit()
    .attr('opacity', 1)
    .transition()
    .attr('opacity', 0)
    // .attrTween('d', arcTween)
    // .attrTween('d', function attrTween(dataItem) {
    //   const previous = d3.select(this).attr('d');
    //   const newLine = arc(dataItem);
    //   return interpolatePath(previous, newLine);
    // })
    .remove();

  current
    .merge(enter)
    .select('path')
    .transition()
    .attr('fill', (dataItem, index) => colors(index))
    .attrTween('d', arcTween);
  // .attrTween('d', function attrTween(dataItem) {
  //   const previous = d3.select(this).attr('d');
  //   const newLine = arc(dataItem);
  //   return interpolatePath(previous, newLine);
  // });

  function arcTween(newPath) {
    const interpolated = d3.interpolate(this.currentPath, newPath);
    this.currentPath = interpolated(0);
    return (arg) => arc(interpolated(arg));
  }
}
