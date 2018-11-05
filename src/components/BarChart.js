import React from 'react';
import * as d3 from 'd3';
import Responsive from './Responsive';
import { BAR_CHART_PROPTYPES } from '../config/types';
import {
  XAxis,
  YAxis,
  Bars,
  XGrid,
  YGrid,
} from './D3RenderedComponents';

class BarChart extends React.Component {
  static propTypes = BAR_CHART_PROPTYPES;

  getScales() {
    const {
      data,
      xFn,
      yFn,
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

    const xDomain = data.map(xFn);
    // const yDomain = d3.extent(data.map(yFn));
    const yMax = d3.max(data, (dataItem) => yFn(dataItem));
    const yDomain = [0, yMax + (yMax * 0.02)];

    xScale
      .domain(xDomain)
      .range([0, width - left - right])
      .paddingInner(paddingInner)
      .paddingOuter(paddingOuter);

    yScale
      .domain(yDomain)
      .range([height - top - bottom, 0]);

    return { xScale, yScale };
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
      yFn,
    } = this.props;
    const { xScale, yScale } = this.getScales();
    const { plotWidth, plotHeight } = this.getPlotDimentions();

    const metaData = {
      xScale,
      yScale,
      plotWidth,
      plotHeight,
    };

    const plotData = {
      plotData: data.map((dataItem, index) => ({
        id: index,
        data: dataItem,
        x: xScale(xFn(dataItem)),
        y: yScale(yFn(dataItem)),
        width: xScale.bandwidth(),
        height: plotHeight - yScale(yFn(dataItem)),
      })),
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
            <Bars {...metaData} {...plotData} />
          </g>
        </g>
      </svg>
    );
  }
}

export default Responsive(BarChart);
