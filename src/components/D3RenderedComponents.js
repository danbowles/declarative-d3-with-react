import React from 'react';
import PropTypes from 'prop-types';
import * as d3 from 'd3';

export default function D3blackbox(d3Component) {
  return class Blackbox extends React.Component {
    static propTypes = {
      transform: PropTypes.string.isRequired,
    }

    componentDidMount() {
      d3Component.call(this);
    }

    componentDidUpdate() {
      d3Component.call(this);
    }

    render() {
      const { transform = '' } = this.props;
      return (
        <g
          transform={transform}
          ref={(gRef) => { this.anchor = gRef; }}
        />
      );
    }
  };
}

export const XAxis = D3blackbox(function XAxis() {
  const axis = d3
    .axisBottom()
    .tickFormat((dataItem) => dataItem)
    .scale(this.props.xScale);

  d3
    .select(this.anchor)
    .classed('xAxis', true)
    .transition()
    .call(axis);
});

export const YAxis = D3blackbox(function YAxis() {
  const axis = d3
    .axisLeft()
    .tickFormat((dataItem) => dataItem)
    .scale(this.props.yScale);

  d3
    .select(this.anchor)
    .classed('yAxis', true)
    .transition()
    .call(axis);
});

export const YGrid = D3blackbox(function YGrid() {
  const axis = d3
    .axisRight()
    .tickFormat(() => null)
    .scale(this.props.yScale)
    .tickSizeOuter(0)
    .tickSizeInner(this.props.plotWidth);

  d3
    .select(this.anchor)
    .classed(this.props.className || 'yGrid', true)
    .call(axis);
});

export const XGrid = D3blackbox(function XGrid() {
  const axis = d3
    .axisBottom()
    .tickFormat(() => null)
    .scale(this.props.xScale)
    .tickSizeOuter(0)
    .tickSizeInner(this.props.plotHeight);

  d3
    .select(this.anchor)
    .classed('xGrid', true)
    .call(axis);
});

export const Line = D3blackbox(function Line() {
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
  // enter.style('fill', 'none');

  enter.append('path')
    .attr('d', pathData)
    .attr('fill', 'none')
    .attr('stroke', 'blue');

  // const exit = current.exit();

  current
    .merge(current)
    .transition()
    .duration(1000)
    .attr('d', pathData);
});

export const Bars = D3blackbox(function Bars() {
  // const parent = d3.select(this.anchor); // .datum(this.props.plotData);

  const current = d3.select(this.anchor)
    .selectAll('.bar').data(this.props.plotData);
  // const current = d3.select(this.anchor)
  //   .selectAll('rect').data(this.props.plotData);

  current.interrupt();

  // current.transition().attr('fill', 'green');

  const enter = current.enter().append('g').classed('bar', true);
  enter.attr('fill', 'blue');

  enter
    .append('rect')
    .attr('height', 0)
    .attr('transform', ({ x }) => `translate(${x}, ${this.props.plotHeight})`);

  const exit = current.exit().classed('bar', false);
  exit
    .attr('fill', 'red')
    .attr('opacity', 1)
    .transition()
    .attr('opacity', 0)
    .remove();

  current
    .merge(enter)
    .select('rect')
    .attr('width', ({ width }) => width)
    .transition()
    .attr('transform', ({ x, y }) => `translate(${x}, ${y})`)
    .attr('height', ({ height }) => height);
});
