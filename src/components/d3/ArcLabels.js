import * as d3 from 'd3';
import { mergeWithFirstEqualZero } from '../../utils/utils';

export default function D3ArcLabels() {
  const {
    plotData,
    // arc,
    labelFn,
    valueFn,
    outerArc,
  } = this.props;
  const pie = d3.pie()
    .value(valueFn)
    .sort(null);

  const existing = d3.select(this.anchor).datum(plotData)
    .selectAll('.arc-label')
    .data()
    .map(({ data }) => data);

  const dataCurrent = mergeWithFirstEqualZero(
    plotData,
    existing.length ? existing : plotData
  );

  const dataNew = mergeWithFirstEqualZero(
    existing.length ? existing : plotData,
    plotData
  );

  console.log(dataCurrent);
  console.log(dataNew);

  const current = d3.select(this.anchor)
    .selectAll('.arc-label')
    .data(pie(dataCurrent), labelFn);

  const enter = current.enter().append('g').classed('arc-label', true);

  enter
    .append('text')
    .attr('dy', '0.35em')
    .text(labelFn)
    .each((dataItem) => { this.currentPath = dataItem; });

  enter
    .transition()
    .attr(
      'transform',
      (dataItem) => `translate(${outerArc.centroid(dataItem)})`
    );

  current
    .data(pie(dataNew), labelFn)
    .transition()
    .attr(
      'transform',
      (dataItem) => `translate(${outerArc.centroid(dataItem)})`
    );

  current.exit()
    .attr('opacity', 1)
    .transition()
    .attr('opacity', 0)
    .remove();

  // current
  //   .data(pie(dataNew))
  //   .merge(current)
  //   .select('text')
  //   .transition()
  //   .attr(
  //     'transform',
  //     (dataItem) => `translate(${outerArc.centroid(dataItem)})`
  //   );
  // .attrTween('transform', attrTweenTransform);

  // function attrTweenTransform(dataItem) {
  //   const interpolate = d3.interpolate(this.currentPath, dataItem);
  //   const current = this.currentPath;
  // }
  // var text = svg.select(".labels").selectAll("text")
  //   .data(pie(was), key);

  // text.enter()
  //   .append("text")
  //   .attr("dy", ".35em")
  //   .style("opacity", 0)
  //   .text(function(d) {
  //     return d.data.label;
  //   })
  //   .each(function(d) {
  //     this._current = d;
  //   });

  // function midAngle(d){
  //   return d.startAngle + (d.endAngle - d.startAngle)/2;
  // }

  // text = svg.select(".labels").selectAll("text")
  //   .data(pie(is), key);

  // text.transition().duration(duration)
  //   .style("opacity", function(d) {
  //     return d.data.value == 0 ? 0 : 1;
  //   })
  //   .attrTween("transform", function(d) {
  //     var interpolate = d3.interpolate(this._current, d);
  //     var _this = this;
  //     return function(t) {
  //       var d2 = interpolate(t);
  //       _this._current = d2;
  //       var pos = outerArc.centroid(d2);
  //       pos[0] = radius * (midAngle(d2) < Math.PI ? 1 : -1);
  //       return "translate("+ pos +")";
  //     };
  //   })
  //   .styleTween("text-anchor", function(d){
  //     var interpolate = d3.interpolate(this._current, d);
  //     return function(t) {
  //       var d2 = interpolate(t);
  //       return midAngle(d2) < Math.PI ? "start":"end";
  //     };
  //   });

  // text = svg.select(".labels").selectAll("text")
  //   .data(pie(data), key);

  // text
  //   .exit().transition().delay(duration)
  //   .remove();
  // const { plotData, arc } = this.props;
  // const pie = d3.pie()
  //   .value(({ value }) => value)
  //   .sort(null);

  // const current = d3.select(this.anchor).datum(plotData)
  //   .selectAll('.arc')
  //   .data(pie);

  // const enter = current.enter().append('g').classed('arc', true);

  // enter
  //   .append('path')
  //   .transition()
  //   .attr('fill', (dataItem, index) => colors(index))
  //   .attr('d', arcTween)
  //   .each((dataItem) => { this.currentPath = dataItem; });

  // current.exit()
  //   .attr('opacity', 1)
  //   .transition()
  //   .attr('opacity', 0)
  //   .remove();

  // current
  //   .merge(enter)
  //   .select('path')
  //   .transition()
  //   .attr('fill', (dataItem, index) => colors(index))
  //   .attrTween('d', arcTween);

  // // TODO: to new file
  // function arcTween(dataItem) {
  //   const interpolated = d3.interpolate(this.currentPath || 0, dataItem);
  //   this.currentPath = interpolated(0);
  //   return (arg) => arc(interpolated(arg));
  // }

  // function arcTweenII(dataItem) {
  //   const interpolated = d3.interpolate(
  //     dataItem.startAngle + 0.1,
  //     dataItem.endAngle
  //   );
  //   return (arg) => arc({ ...dataItem, endAngle: interpolated(arg) });
  // }
}
