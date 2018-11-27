import React from 'react';
import * as d3 from 'd3';
import Responsive from './Responsive';
import { BAR_CHART_PROPTYPES } from '../config/types';
import {
  BarStacks,
  XAxis,
  YAxis,
  XGrid,
  YGrid,
} from './D3RenderedComponents';
import { COLORS } from '../config/constants';

const randomColors = [...COLORS].sort(() => (0.5 < Math.random() ? - 1 : 1));

class MultiBarChart extends React.Component {
  static propTypes = BAR_CHART_PROPTYPES;

  getScales() {
    const {
      data,
      xFn,
      // yFn,
      width,
      height,
      paddingInner,
      paddingOuter,
      margin: {
        left, right, top, bottom,
      },
    } = this.props;

    const xScale = d3.scaleBand();
    const yScale = d3.scaleLinear().nice();
    const keyScale = d3.scaleOrdinal()
      .range(randomColors);

    const xDomain = data.map(xFn);
    const yDomain = [0, d3.max(
      data.reduce(
        (acc, curr) => {
          const total = Object.keys(curr).slice(1)
            .reduce((acc1, curr1) => acc1 + curr[curr1], 0);
          acc.push(total);
          return acc;
        }, []
      )
    )];
    const keyDomain = Object.keys(data[0]).slice(1);

    xScale
      .domain(xDomain)
      .range([0, width - left - right])
      .paddingInner(paddingInner)
      .paddingOuter(paddingOuter);

    yScale
      .domain(yDomain)
      .rangeRound([height - top - bottom, 0]);

    keyScale.domain(keyDomain);

    return { xScale, yScale, keyScale };
  }

  getPlotDimentions() {
    const {
      width,
      height,
      margin: {
        left,
        right,
        top,
        bottom,
      },
    } = this.props;
    const plotWidth = width - left - right;
    const plotHeight = height - top - bottom;

    return { plotWidth, plotHeight };
  }

  render() {
    const {
      width,
      height,
      margin,
      data,
      xFn,
      // yFn,
    } = this.props;
    const { xScale, yScale, keyScale } = this.getScales();
    const { plotWidth, plotHeight } = this.getPlotDimentions();

    const stack = d3.stack().keys(Object.keys(data[0]).slice(1))(data);

    const metaData = {
      xScale,
      yScale,
      keyScale,
      plotWidth,
      plotHeight,
      xFn,
    };

    const plotData = {
      stack,
      data,
      // plotData: data.map((dataItem, index) => ({
      //   id: index,
      //   data: dataItem,
      //   x: xScale(xFn(dataItem)),
      //   y: yScale(yFn(dataItem)),
      //   width: xScale.bandwidth(),
      //   height: plotHeight - yScale(yFn(dataItem)),
      // })),
    };

    return (
      <svg width={width} height={height}>
        <g transform={`translate(${margin.left},${margin.top})`}>
          <g className="axisLayer">
            <YGrid {...metaData} />
            <XGrid {...metaData} />
            <XAxis {...metaData} transform={`translate(0,${plotHeight})`} />
            <YAxis {...metaData} />
          </g>
          <g className="plotLayer">
            <BarStacks {...metaData} {...plotData} />
          </g>
        </g>
      </svg>
    );
  }
}

export default Responsive(MultiBarChart);
