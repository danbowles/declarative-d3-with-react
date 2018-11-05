import React from 'react';
import PropTypes from 'prop-types';

export default function D3Render(d3Component) {
  return class Blackbox extends React.Component {
    static propTypes = {
      transform: PropTypes.string,
    }

    static defaultProps = {
      transform: '',
    }

    componentDidMount() {
      d3Component.call(this);
    }

    componentDidUpdate() {
      d3Component.call(this);
    }

    render() {
      const { transform } = this.props;
      return (
        <g
          transform={transform}
          ref={(gRef) => { this.anchor = gRef; }}
        />
      );
    }
  };
}
