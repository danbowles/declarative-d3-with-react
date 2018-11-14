import React from 'react';
import styled from 'styled-components';
import Header from './Header';
import SvgTest from './SvgTest';
import BarChart from './BarChart';
import {
  barData,
  lineData,
  // multiLineData,
  pieData,
} from '../services/chartData';
import LineChart from './LineChart';
import PieChart from './PieChart';
import { CHART_MARGINS } from '../config/constants';

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

    this.state = {
      barChartData: barData(),
      lineChartData: lineData(),
      pieChartData: pieData(),
    };

    this.onUpdateBarChartDataClick = this.onUpdateBarChartDataClick.bind(this);
    this.onUpdateLineChartDataClick = this.onUpdateLineChartDataClick.bind(this); // eslint-disable-line max-len
    this.onUpdatePieChartDataClick = this.onUpdatePieChartDataClick.bind(this);
  }

  onUpdateBarChartDataClick() {
    this.setState({
      barChartData: barData(),
    });
  }

  onUpdatePieChartDataClick() {
    this.setState({
      pieChartData: pieData(),
    });
  }

  onUpdateLineChartDataClick() {
    this.setState({
      lineChartData: lineData(),
    });
  }

  render() {
    const { barChartData, lineChartData, pieChartData } = this.state;
    return (
      <div className="app">
        <Header title="My App Name is Neat!" />
        <ChartContainer>
          <ChartHeading>
            <RefreshButton
              onClick={this.onUpdatePieChartDataClick}
              type="button"
            >
              Update Pie Data
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
              onClick={this.onUpdateLineChartDataClick}
              type="button"
            >
              Update Line Data
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
              Update Bar Data
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
        <SvgTest />
      </div>
    );
  }
}

export default App;
