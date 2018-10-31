import React from 'react';
import Header from './Header';
import SvgTest from './SvgTest';
import BarChart from './BarChart';
import { barData } from '../services/chartData';

const App = () => (
  <div className="app">
    <Header title="My App Name is Neat!" />
    <BarChart
      data={barData()}
      xFn={({ year }) => year}
      yFn={({ value }) => value}
      margin={{
        top: 60,
        left: 40,
        bottom: 20,
        right: 20,
      }}
      paddingInner={0.1}
      paddingOuter={0.1}
    />
    <SvgTest />
    <SvgTest />
  </div>
);

export default App;
