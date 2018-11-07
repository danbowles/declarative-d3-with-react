import * as d3 from 'd3';
// import { interpolatePath } from 'd3-interpolate-path';

function colors(index) {
  const colorArray = [
    '#3366cc',
    '#dc3912',
    '#ff9900',
    '#109618',
    '#990099',
    '#0099c6',
    '#dd4477',
    '#66aa00',
    '#b82e2e',
    '#316395',
    '#994499',
    '#22aa99',
    '#aaaa11',
    '#6633cc',
    '#e67300',
    '#8b0707',
    '#651067',
    '#329262',
    '#5574a6',
    '#3b3eac',
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
