import React from 'react';
import styled from 'styled-components';
import * as d3 from 'd3';
import Header from './Header';
import BarChart from './BarChart';
import {
  barData,
  multiLineData,
  pieData,
  multiBarData,
  horizontalBarData,
} from '../services/chartData';
import LineChart from './LineChart';
import PieChart from './PieChart';
import MultiBarChart from './MultiBarChart';
import { CHART_MARGINS } from '../config/constants';
import HorizontalBarChart from './HorizontalBarChart';

const ChartContainer = styled.div`
  background: white;
  border-radius: 6px;
  border: 1px solid #cfd8dc;
  margin: 2em;
  box-shadow: 0 4px 20px 0px rgba(0, 0, 0, 0.14);
  & > div:last-child {
    height: calc(75vh - 100px);
  }
`;

const ChartHeading = styled.div`
  align-items: center;
  display: flex;
`;

const RefreshButton = styled.button`
  background: #d32f2f;
  color: white;
  border-radius: 30px;
  font-size: 1em;
  margin: 1em;
  padding: 13px 20px;
`;
class App extends React.Component {
  constructor(props) {
    super(props);

    horizontalBarData.reverse();

    this.state = {
      barChartData: barData(),
      multiBarChartData: multiBarData(4),
      multiLineChartData: multiLineData(3),
      lineChartData: multiLineData(),
      pieChartData: pieData(),
      horizontalBarChartData: horizontalBarData,
    };

    this.onUpdateBarChartDataClick = this.onUpdateBarChartDataClick.bind(this);
    this.onUpdateMultiBarChartDataClick = this.onUpdateMultiBarChartDataClick.bind(this); // eslint-disable-line max-len
    this.onUpdateMultiLineChartDataClick = this.onUpdateMultiLineChartDataClick.bind(this); // eslint-disable-line max-len
    this.onUpdateLineChartDataClick = this.onUpdateLineChartDataClick.bind(this); // eslint-disable-line max-len
    this.onUpdatePieChartDataClick = this.onUpdatePieChartDataClick.bind(this);
  }

  onUpdateBarChartDataClick() {
    this.setState({
      barChartData: barData(),
    });
  }

  onUpdateMultiBarChartDataClick() {
    this.setState({
      multiBarChartData: multiBarData(4),
    });
  }

  onUpdatePieChartDataClick() {
    this.setState({
      pieChartData: pieData(),
    });
  }

  onUpdateMultiLineChartDataClick() {
    this.setState({
      multiLineChartData: multiLineData(3),
    });
  }

  onUpdateLineChartDataClick() {
    this.setState({
      lineChartData: multiLineData(),
    });
  }

  render() {
    const {
      barChartData,
      multiLineChartData,
      lineChartData,
      pieChartData,
      multiBarChartData,
      horizontalBarChartData,
    } = this.state;

    const horizontalGuideData = { ...horizontalBarChartData[0] };
    horizontalBarChartData.reverse();

    return (
      <div className="app">
        <Header />
        <ChartContainer>
          <ChartHeading>
            <RefreshButton
              onClick={this.onUpdateBarChartDataClick}
              type="button"
            >
              Refresh
            </RefreshButton>
            <h2>Horizontal Bar Chart</h2>
          </ChartHeading>
          <HorizontalBarChart
            data={horizontalBarChartData}
            xFn={({ value }) => value}
            yFn={({ label }) => label}
            margin={{ ...CHART_MARGINS, left: 100, right: 100 }}
            paddingInner={0.1}
            paddingOuter={0.1}
            guideData={horizontalGuideData}
            guideTitle="National Data"
            formatter={d3.format('.1%')}
          />
        </ChartContainer>
        <ChartContainer>
          <ChartHeading>
            <RefreshButton
              onClick={this.onUpdateMultiBarChartDataClick}
              type="button"
            >
              Refresh
            </RefreshButton>
            <h2>Multi-Bar Chart</h2>
          </ChartHeading>
          <MultiBarChart
            data={multiBarChartData}
            xFn={({ year }) => year}
            yFn={({ value }) => value}
            margin={CHART_MARGINS}
            paddingInner={0.1}
            paddingOuter={0.1}
          />
        </ChartContainer>
        <ChartContainer>
          <ChartHeading>
            <RefreshButton
              onClick={this.onUpdatePieChartDataClick}
              type="button"
            >
              Refresh
            </RefreshButton>
            <h2>Pie Chart</h2>
          </ChartHeading>
          <PieChart
            data={pieChartData}
            valueFn={({ value }) => value}
            labelFn={({ data: { label } = {} } = {}) => label}
            margin={{ ...CHART_MARGINS, left: 100, right: 100 }}
          />
        </ChartContainer>
        <ChartContainer>
          <ChartHeading>
            <RefreshButton
              onClick={this.onUpdateMultiLineChartDataClick}
              type="button"
            >
              Refresh
            </RefreshButton>
            <h2>Multi-Line Chart</h2>
          </ChartHeading>
          <LineChart
            data={multiLineChartData}
            xFn={({ year }) => year}
            yFn={({ value }) => value}
            margin={CHART_MARGINS}
          />
        </ChartContainer>
        <ChartContainer>
          <ChartHeading>
            <RefreshButton
              onClick={this.onUpdateLineChartDataClick}
              type="button"
            >
              Refresh
            </RefreshButton>
            <h2>Line Chart</h2>
          </ChartHeading>
          <LineChart
            data={lineChartData}
            xFn={({ year }) => year}
            yFn={({ value }) => value}
            margin={CHART_MARGINS}
          />
        </ChartContainer>
        <ChartContainer>
          <ChartHeading>
            <RefreshButton
              onClick={this.onUpdateBarChartDataClick}
              type="button"
            >
              Refresh
            </RefreshButton>
            <h2>Bar Chart</h2>
          </ChartHeading>
          <BarChart
            data={barChartData}
            xFn={({ year }) => year}
            yFn={({ value }) => value}
            margin={CHART_MARGINS}
            paddingInner={0.1}
            paddingOuter={0.1}
          />
        </ChartContainer>
      </div>
    );
  }
}

export default App;
