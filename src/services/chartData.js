import * as d3 from 'd3';

const randomInt = (n) => Math.round(Math.random() * n);

export const pieData = () => d3.range(2000, 2011)
  .map((dataItem, index) => (0.5 <= Math.random() ? {
    id: index,
    year: dataItem,
    value: randomInt(600),
  } : {}));

export const lineData = () => d3.range(2000, 2005 + randomInt(10))
  .map((dataItem, index) => ({
    id: index,
    year: dataItem,
    value: Math.random(),
  }));

export const barData = () => d3.range(2000, 2005 + randomInt(10))
  .map((dataItem, index) => ({
    id: index,
    year: dataItem,
    value: 300 + randomInt(600) + 1,
  }));
