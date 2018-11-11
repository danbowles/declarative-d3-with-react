import * as d3 from 'd3';

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
].sort(() => (0.5 < Math.random() ? - 1 : 1));

function colors(index) {
  // TODO: config file
  return colorArray[index % colorArray.length];
}

export default function D3Arcs() {
  const {
    plotData,
    arc,
    labelFn,
    pie,
  } = this.props;

  const currentData = d3.select(this.anchor).selectAll('path').data();
  const incomingData = pie(plotData);

  const paths = d3.select(this.anchor).datum(plotData)
    .selectAll('path')
    .data(incomingData);

  paths
    .exit()
    .datum((dataItem, index) => findNeighborArc(
      index,
      incomingData,
      currentData,
      labelFn
    ) || dataItem)
    .transition()
    .attrTween('d', tween)
    .remove();

  paths
    .enter()
    .append('path')
    .attr('fill', (dataItem, index) => colors(index))
    .attr('d', arc)
    .each((dataItem, index) => {
      this.currentData = findNeighborArc(
        index,
        incomingData,
        currentData,
        labelFn
      );
    })
    .merge(paths)
    .transition()
    .attr('fill', (dataItem, index) => colors(index))
    .attrTween('d', tween);

  function tween(arcData) {
    const interpolate = d3.interpolate(this.currentData, arcData);
    this.currentData = interpolate(0);
    return (timeValue) => arc(interpolate(timeValue));
  }

  function findNeighborArc(index, data0, data1, keyFn) {
    let neighborArc;
    const preceding = findPreceding(index, data0, data1, keyFn);
    const following = findFollowing(index, data0, data1, keyFn);
    if (preceding) {
      const { endAngle } = preceding;
      neighborArc = { startAngle: endAngle, endAngle };
    } else if (following) {
      const { startAngle } = following;
      neighborArc = { startAngle, endAngle: startAngle };
    }

    return neighborArc || null;
  }

  /* eslint-disable */  
  // Find the element in data0 that joins the highest preceding element in data1.
  function findPreceding(i, data0, data1, key) {
    var m = data0.length;
    while (--i >= 0) {
      var k = key(data1[i]);
      for (var j = 0; j < m; ++j) {
        if (key(data0[j]) === k) return data0[j];
      }
    }
  }
  
  // Find the element in data0 that joins the lowest following element in data1.
  function findFollowing(i, data0, data1, key) {
    var n = data1.length, m = data0.length;
    while (++i < n) {
      var k = key(data1[i]);
      for (var j = 0; j < m; ++j) {
        if (key(data0[j]) === k) return data0[j];
      }
    }
  }
  /* eslint-enable */
}
