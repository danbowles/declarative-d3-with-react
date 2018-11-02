import React from 'react';
import PropTypes from 'prop-types';
import * as d3 from 'd3';
import Responsive from './Responsive';
import {
  XAxis,
  YAxis,
  Line,
  XGrid,
  YGrid,
  ScatterPlot,
} from './D3RenderedComponents';

class BarChart extends React.Component {
  static propTypes = {
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
    margin: PropTypes.shape({
      top: PropTypes.number,
      left: PropTypes.number,
      right: PropTypes.number,
      bottom: PropTypes.number,
    }).isRequired,
    xFn: PropTypes.func.isRequired,
    yFn: PropTypes.func.isRequired,
    // TODO: bar chart data shape
    data: PropTypes.shape({}).isRequired,
  };

  getScales() {
    const {
      data,
      xFn,
      yFn,
      width,
      height,
      margin: {
        left, right, top, bottom,
      },
    } = this.props;

    const xScale = d3.scaleLinear();
    const yScale = d3.scaleLinear();

    const xDomain = d3.extent(data.map(xFn));
    const yDomain = d3.extent(data.map(yFn));

    xScale
      .domain(xDomain)
      .range([0, width - left - right]);

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
            <Line {...metaData} {...plotData} />
            <ScatterPlot {...metaData} {...plotData} />
          </g>
        </g>
      </svg>
    );
  }
}

export default Responsive(BarChart);
