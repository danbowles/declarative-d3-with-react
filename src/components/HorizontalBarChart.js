import React from 'react';
import * as d3 from 'd3';
import Responsive from './Responsive';
import { BAR_CHART_PROPTYPES } from '../config/types';
import {
  Bars,
  XAxis,
  YAxis,
  XGrid,
  YGrid,
  GuideLine,
} from './D3RenderedComponents';
// import { COLORS } from '../config/constants';

const groupPadding = 30;

// const randomColors = [...COLORS].sort(() => (0.5 < Math.random() ? - 1 : 1));
const threshold = d3.scaleThreshold()
  .domain([0.099, 0.149, 0.199, 0.249, 0.299, 0.349, 0.399])
  .range(['#3E94DD', '#5EBAB3', '#75C044', '#F7C343', '#F08533', '#EC5152', '#90288F', '#451369']); // eslint-disable-line max-len

class HorizontalBarchart extends React.Component {
  static propTypes = BAR_CHART_PROPTYPES;

  getFlatData() {
    const { grouped, data } = this.props;
    const flatData = grouped
      ? data.groups.reduce((acc, curr) => acc.concat(curr), []) : data;

    return { flatData };
  }

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
      grouped,
    } = this.props;

    const { flatData } = this.getFlatData();

    const xScale = d3.scaleLinear().nice();
    const yScale = d3.scaleBand();

    const yDomain = flatData.map(yFn);
    const xMax = d3.max(flatData, (dataItem) => xFn(dataItem));
    const xDomain = [0, xMax + (xMax * 0.02)];

    xScale
      .domain(xDomain)
      .range([0, width - left - right]);

    yScale
      .domain(yDomain)
      .range([
        height - top - bottom, 0])
      .paddingInner(paddingInner)
      .paddingOuter(paddingOuter);

    if (grouped) {
      const groupCount = data.groups.length - 1; // Minus 1 as we don't pad first group.

      yScale.range([yScale.range()[0] - (groupPadding * groupCount), 0]);
    }

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
      formatter,
      guideData,
      guideTitle,
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
        x: 1,
        y: yScale(yFn(dataItem)),
        height: yScale.bandwidth(),
        width: xScale(xFn(dataItem)),
        fill: threshold(xFn(dataItem)),
        formatted: formatter ? formatter(dataItem.value) : dataItem.value,
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
            <Bars {...plotData} labeled />
            <GuideLine
              x1={xScale(xFn(guideData))}
              x2={xScale(xFn(guideData))}
              y1="0"
              y2={plotHeight}
              title={guideTitle}
              label={guideData.label}
            />
          </g>
        </g>
      </svg>
    );
  }
}

export default Responsive(HorizontalBarchart);
