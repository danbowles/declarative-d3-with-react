import React from 'react';
import Header from './Header';
import SvgTest from './SvgTest';
import BarChart from './BarChart';
import { barData, lineData, pieData } from '../services/chartData';
import LineChart from './LineChart';
import PieChart from './PieChart';

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
        <button
          onClick={this.onUpdatePieChartDataClick}
          type="button"
        >
          Update Pie Data
        </button>
        <PieChart
          data={pieChartData}
          valueFn={({ value }) => value}
          margin={margin}
        />
        <button
          onClick={this.onUpdateLineChartDataClick}
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
