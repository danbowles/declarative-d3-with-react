import * as d3 from 'd3';

export const randomInt = (n) => Math.round(Math.random() * n);

export function testing123() {}

export function mergeWithFirstEqualZero(first, second) {
  const secondSet = d3.set();

  second.forEach(({ label }) => { secondSet.add(label); });
  const onlyFirst = first
    .filter(({ label }) => ! secondSet.has(label))
    .map(({ label }) => ({ label, value: 0 }));

  return d3.merge([second, onlyFirst])
    .sort((dataA, dataB) => d3.ascending(dataA.label, dataB.label));
}
