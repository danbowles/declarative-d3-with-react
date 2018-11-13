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

const ChartHeading = styled.div`
  display: flex;
  height: auto;
`;

const ChartContainer = styled.div`
  & > div {
    height: calc(75vh - 100px);
  }
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
        <ChartHeading>
          <button
            onClick={this.onUpdatePieChartDataClick}
            type="button"
          >
            Update Pie Data
          </button>
          <h2>Pie Chart</h2>
        </ChartHeading>
        <ChartContainer>
          <PieChart
            data={pieChartData}
            valueFn={({ value }) => value}
            labelFn={({ data: { label } = {} } = {}) => label}
            margin={{ ...CHART_MARGINS, left: 100, right: 100 }}
          />
        </ChartContainer>
        <ChartHeading>
          <button
            onClick={this.onUpdateLineChartDataClick}
            type="button"
          >
            Update Line Data
          </button>
          <h2>Line Chart</h2>
        </ChartHeading>
        <ChartContainer>
          <LineChart
            data={lineChartData}
            xFn={({ year }) => year}
            yFn={({ value }) => value}
            margin={CHART_MARGINS}
          />
        </ChartContainer>
        <ChartHeading>
          <button
            onClick={this.onUpdateBarChartDataClick}
            type="button"
          >
            Update Bar Data
          </button>
          <h2>Bar Chart</h2>
        </ChartHeading>
        <ChartContainer>
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
