import PropTypes from 'prop-types';

export const CHART_PROPTYPES = {
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  margin: PropTypes.shape({
    top: PropTypes.number,
    left: PropTypes.number,
    right: PropTypes.number,
    bottom: PropTypes.number,
  }).isRequired,
  xFn: PropTypes.func.isRequired,
  yFn: PropTypes.func.isRequired,
  // TODO: bar chart data shape
  data: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};

export const BAR_CHART_PROPTYPES = {
  ...CHART_PROPTYPES,
  paddingInner: PropTypes.number,
  paddingOuter: PropTypes.number,
};

export const LINE_CHART_PROPTYPES = {
  ...CHART_PROPTYPES,
};

export const PIE_CHART_PROPTYPES = {
  ...CHART_PROPTYPES,
};
