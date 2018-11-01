import React from 'react';
import Header from './Header';
import SvgTest from './SvgTest';
import BarChart from './BarChart';
import { barData, lineData } from '../services/chartData';
import LineChart from './LineChart';

const margin = {
  top: 60,
  left: 40,
  bottom: 20,
  right: 20,
};

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      barChartData: barData(),
      lineChartData: lineData(),
    };

    this.onUpdateBarChartDataClick = this.onUpdateBarChartDataClick.bind(this);
    this.onUpdateLineChartData = this.onUpdateLineChartData.bind(this);
  }

  onUpdateBarChartDataClick() {
    this.setState({
      barChartData: barData(),
    });
  }

  onUpdateLineChartData() {
    this.setState({
      lineChartData: lineData(),
    });
  }

  render() {
    const { barChartData, lineChartData } = this.state;
    return (
      <div className="app">
        <Header title="My App Name is Neat!" />
        <button
          onClick={this.onUpdateLineChartData}
          type="button"
        >
          Update Line Data
        </button>
        <LineChart
          data={lineChartData}
          xFn={({ year }) => year}
          yFn={({ value }) => value}
          margin={margin}
        />
        <button
          onClick={this.onUpdateBarChartDataClick}
          type="button"
        >
          Update Bar Data
        </button>
        <BarChart
          data={barChartData}
          xFn={({ year }) => year}
          yFn={({ value }) => value}
          margin={margin}
          paddingInner={0.1}
          paddingOuter={0.1}
        />
        <SvgTest />
        <SvgTest />
      </div>
    );
  }
}

export default App;
