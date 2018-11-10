import * as d3 from 'd3';
import { randomInt } from '../utils/utils';

export const pieData = () => d3.range(2000, 2011)
  .map((dataItem, index) => (0.5 <= Math.random() ? {
    id: index,
    label: dataItem,
    value: randomInt(600),
  } : {}))
  // .filter(({ id }) => id)
  .sort((dataA, dataB) => d3.ascending(dataA.label, dataB.label));

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
