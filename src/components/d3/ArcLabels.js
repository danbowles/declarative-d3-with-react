import * as d3 from 'd3';
// import { mergeWithFirstEqualZero } from '../../utils/utils';

export default function D3ArcLabels() {
  const {
    plotData,
    labelFn,
    pie,
    arc,
    outerArc,
    radius,
  } = this.props;

  const incomingData = pie(plotData);

  const labels = d3.select(this.anchor).datum(plotData)
    .selectAll('text')
    .data(incomingData, labelFn);

  labels
    .exit()
    .remove();

  labels
    .enter()
    .append('text')
    .attr('dy', '0.35em')
    .text(labelFn)
    .merge(labels)
    .transition()
    .duration(800)
    .attr(
      'transform',
      (dataItem) => {
        const pos = outerArc.centroid(dataItem);
        pos[0] = (radius * 1.1) * (midAngle(dataItem) < Math.PI ? 1 : - 1);
        return `translate(${pos})`;
      }
    );

  function midAngle({ startAngle, endAngle }) {
    return startAngle + (endAngle - startAngle) / 2;
  }

  function storeCurrent(dataItem) {
    this.currentPath = dataItem;
  }

  const polylines = d3.select(this.anchor).datum(plotData)
    .selectAll('polyline')
    .data(incomingData, labelFn);

  polylines
    .exit()
    .remove();

  polylines.enter()
    .append('polyline')
    .each(storeCurrent)
    .attr('fill', 'none')
    .attr('stroke', '#424242')
    .merge(polylines)
    .transition()
    .duration(1000)
    .attrTween('points', function attrTween(dataItem) {
      const interpolate = d3.interpolate(this.currentPath, dataItem);
      const self = this;
      return (timeValue) => {
        const interpolated = interpolate(timeValue);
        self.current = interpolated;
        const pos = outerArc.centroid(interpolated);
        pos[0] = (radius) * (midAngle(interpolated) < Math.PI ? 1 : - 1);
        return [
          arc.centroid(interpolated),
          outerArc.centroid(interpolated),
          pos,
        ];
      };
    });
}
