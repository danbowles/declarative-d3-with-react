import * as d3 from 'd3';

export default function D3GuideLine() {
  const current = d3.select(this.anchor)
    .selectAll('.guide').data([this.props]);

  const enter = current.enter().append('g').classed('guide', true);

  current.exit().remove();

  enter
    .append('line')
    .attr('stroke', 'black');

  const text = enter
    .append('text')
    // .attr('x', ({ x1 }) => x1)
    .attr('y', - 30)
    .attr('text-anchor', 'middle');

  text.append('tspan')
    .attr('class', 'guide-title')
    .attr('x', ({ x1 }) => x1)
    .text(({ title }) => title);
  text.append('tspan')
    .attr('class', 'guide-label')
    .attr('x', ({ x1 }) => x1)
    .attr('dy', 20)
    .text(({ label }) => label);

  current
    .merge(enter)
    .select('line')
    .transition()
    .attr('x1', ({ x1 }) => x1)
    .attr('x2', ({ x2 }) => x2)
    .attr('y1', ({ y1 }) => y1)
    .attr('y2', ({ y2 }) => y2);

  current
    .merge(enter)
    .select('.guide-title')
    .attr('x', ({ x1 }) => x1);

  current
    .merge(enter)
    .select('.guide-label')
    .attr('x', ({ x1 }) => x1);
}
