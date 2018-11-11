import React from 'react';
import * as d3 from 'd3';
import Responsive from './Responsive';
import { PIE_CHART_PROPTYPES } from '../config/types';
import { Arcs, ArcLabels } from './D3RenderedComponents';

class BarChart extends React.Component {
  static propTypes = PIE_CHART_PROPTYPES;

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
      data,
      labelFn,
      valueFn,
    } = this.props;
    const { plotWidth, plotHeight } = this.getPlotDimentions();

    const radius = Math.min(plotWidth, plotHeight) / 2;

    const metaData = {
      radius,
      labelFn,
      valueFn,
      arc: d3.arc().outerRadius(radius * 0.8).innerRadius(0),
      outerArc: d3.arc().outerRadius(radius).innerRadius(radius),
      pie: d3.pie().value(valueFn).sort(null),
    };

    const plotData = {
      plotData: data.map(({ value, label }) => ({
        // id: index,
        value,
        label,
      })),
    };

    return (
      <svg width={width} height={height}>
        <g transform={`translate(${width / 2},${height / 2})`}>
          <g className="plotLayer">
            <Arcs {...metaData} {...plotData} />
            <ArcLabels {...metaData} {...plotData} />
          </g>
        </g>
      </svg>
    );
  }
}

export default Responsive(BarChart);
