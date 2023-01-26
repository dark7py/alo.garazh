import React from 'react';
import PropTypes from 'prop-types';
import throttle from 'lodash.throttle';

// Отступ в пикселах до появления изображения во
// вьюпорте когда его надо начинать грузить
const LOADING_OFFSET = 400;

// eslint-disable-next-line max-len
const previewGrey = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsQAAA7EAZUrDhsAAAANSURBVBhXYzh8+PB/AAffA0nNPuCLAAAAAElFTkSuQmCC';

class LazyLoadImage extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      error: false,
      isLoaded: props.disable
    };

    this.image = React.createRef();

    this.onScroll = throttle(this.onScroll.bind(this), 500);
    this.onLoadError = this.onLoadError.bind(this);
  }

  componentDidMount() {
    window.addEventListener('scroll', this.onScroll);
    this.onScroll();
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.onScroll);
  }

  onScroll() {
    if (!this.image.current) {
      return;
    }

    const { top } = this.image.current.getBoundingClientRect();

    if (
      top > -LOADING_OFFSET
          && top < window.innerHeight + LOADING_OFFSET
    ) {
      window.removeEventListener('scroll', this.onScroll);
      this.setState({
        isLoaded: true
      });
    }
  }

  onLoadError() {
    this.setState({ error: true });
  }

  getImageSrc() {
    const { src, previewSrc } = this.props;

    const { error, isLoaded } = this.state;

    if (isLoaded && !error) {
      return src;
    }

    return previewSrc;
  }

  render() {
    const {
      className,
      alt
    } = this.props;

    return (
      <img
        ref={this.image}
        className={className}
        src={this.getImageSrc()}
        alt={alt}
        onError={this.onLoadError}
      />
    );
  }
}

LazyLoadImage.propTypes = {
  alt: PropTypes.string,
  src: PropTypes.string.isRequired,
  previewSrc: PropTypes.string,
  className: PropTypes.string.isRequired,
  disable: PropTypes.bool
};

LazyLoadImage.defaultProps = {
  alt: 'image',
  previewSrc: previewGrey,
  disable: false
};

export default LazyLoadImage;
