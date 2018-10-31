import React from 'react';
import PropTypes from 'prop-types';
import Responsive from './Responsive';

const SvgTest = ({ height, width }) => (
  <svg height={height} width={width}>
    <rect
      x="0"
      y="0"
      height={height}
      width={width}
      stroke="red"
      fill="transparent"
      strokeWidth="5"
    />
    <text textAnchor="middle" x={width / 2} y={height / 2}>
      {width}
      {' x '}
      {height}
    </text>
  </svg>
);

SvgTest.propTypes = {
  height: PropTypes.number.isRequired,
  width: PropTypes.number.isRequired,
};

export default Responsive(SvgTest);
