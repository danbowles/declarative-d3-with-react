import * as d3 from 'd3';
import { randomInt } from '../utils/utils';

export const pieData = () => d3.range(2000, 2005)
  .map((dataItem, index) => ({
    id: index,
    label: dataItem,
    value: randomInt(100),
  }))
  .sort((dataA, dataB) => d3.ascending(dataA.label, dataB.label));

export const barData = () => d3.range(2000, 2005 + randomInt(10))
  .map((dataItem, index) => ({
    id: index,
    year: dataItem,
    value: 300 + randomInt(600) + 1,
  }));

export const multiLineData = (numberOfSeries = 1) => {
  const yearMax = 2005 + randomInt(10);
  return d3.range(0, numberOfSeries).reduce((acc, curr, seriesIndex) => {
    acc.push({
      key: `Series No. ${seriesIndex + 1}`,
      data: d3.range(2000, yearMax)
        .map((dataItem, index) => ({
          id: index,
          year: `${dataItem}`,
          value: Math.random(),
        })),
    });
    return acc;
  }, []);
};

export const multiBarData = (numberOfKeys = 1) => d3
  .range(2000, 2005 + randomInt(10))
  .map((dataItem) => ({
    year: dataItem,
    ...d3.range(0, numberOfKeys)
      .reduce((acc, curr) => ({
        ...acc,
        [`Group ${curr + 1}`]: randomInt(
          2 > curr ? curr * 20 + 20 : curr * 10 + 30
        ),
      }), {}),
  }));
