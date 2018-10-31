import React from 'react';

const Responsive = (ComposedComponent) => class extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      containerWidth: null,
      containerHeight: null,
    };

    this.fitParentContainer = this.fitParentContainer.bind(this);
  }

  componentDidMount() {
    this.fitParentContainer();
    window.addEventListener('resize', this.fitParentContainer);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.fitParentContainer);
  }

  fitParentContainer() {
    const currentWidth = this.container.getBoundingClientRect().width;
    const currentHeight = this.container.getBoundingClientRect().height;

    this.setState({
      containerWidth: currentWidth,
      containerHeight: currentHeight,
    });
  }

  render() {
    const { containerWidth, containerHeight } = this.state;

    return (
      <div
        ref={(el) => {
          this.container = el;
        }}
      >
        {null !== containerWidth && (
          <ComposedComponent
            {...this.props}
            width={containerWidth}
            height={containerHeight}
          />
        )}
      </div>
    );
  }
};

export default Responsive;
