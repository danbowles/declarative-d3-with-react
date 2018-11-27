export const randomInt = (n) => Math.round(Math.random() * n);

export const abc = 123;

export function toMultiSeriesData(dataIn) {
  const arrayDataCount = dataIn.filter((x) => Array.isArray(x)).length;
  return dataIn.length === arrayDataCount ? dataIn : [dataIn];
}
