import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { Link } from 'react-router-dom';
import LazyImage from 'components/LazyLoadImage';

import './Brazzers.scss';

const MAX_GALLERY_PHOTOS = 5;

class Brazzers extends React.PureComponent {
  /**
   * Рендерит одну картинку из галереи
   * @param {Object} item объект с полями для изображения
   * @param {Number} i индекс картинки
   * @param {Number} visibleCount количество видимых картинок
   * @param {ReactNode | null} galleryMore узел "остальные фото"
   * @returns {ReactNode}
   */
  renderItem = (item, i, visibleCount, galleryMore) => {
    const {
      link, linkState, alt, disableLazyImages, target
    } = this.props;
    const imgClassNames = classnames({
      Brazzers__image: true,
      'Brazzers__image--contain': item.isDefault
    });

    return (
      <Link
        className="Brazzers__page"
        key={`image-${i}`}
        to={{ pathname: link, state: linkState }}
        target={target}
      >
        <div className="Brazzers__image-wrapper">
          <LazyImage
            className={imgClassNames}
            preview={item.preview}
            src={item.src}
            alt={alt}
            srcSet={item.srcSet}
            disable={disableLazyImages}
          />
          {(i === visibleCount - 1 && galleryMore) ? galleryMore : null}
        </div>
        <div className="Brazzers__button" />
      </Link>
    );
  };

  getImageSrc = (image) => {
    if (typeof image === 'object') {
      return {
        preview: image.preview,
        src: image.original,
        srcSet: image.original,
        isDefault: image.isDefault
      };
    }

    return {
      src: image,
      srcSet: null
    };
  };

  render() {
    const {
      images, alt, count, className, disableLazyImages
    } = this.props;

    const n = count || images.length;
    if (n === 0) {
      return null;
    }

    if (n === 1) {
      const imageSrc = this.getImageSrc(images[0]);
      const imgClassNames = classnames({
        Brazzers__image: true,
        'Brazzers__image--contain': imageSrc.isDefault
      });

      return (
        <div className={classnames('Brazzers', className)}>
          <LazyImage
            className={imgClassNames}
            preview={imageSrc.preview}
            src={imageSrc.src}
            srcSet={imageSrc.srcSet}
            disable={disableLazyImages}
            alt={alt}
          />
        </div>
      );
    }

    let visibleCount;
    let galleryMore;
    if (n > MAX_GALLERY_PHOTOS) {
      visibleCount = MAX_GALLERY_PHOTOS;
      galleryMore = (
        <div className="Brazzers__more">
          <div className="Brazzers__more-wrapper">
            <div className="Brazzers__more-icon" />
            <div className="Brazzers__more-text">
              {`Ещё ${n - MAX_GALLERY_PHOTOS} фото`}
            </div>
          </div>
        </div>
      );
    } else {
      visibleCount = n;
    }

    const imagesComponents = images
      .slice(0, visibleCount)
      .map((image, i) => {
        const imageSrc = this.getImageSrc(image);

        return this.renderItem(imageSrc, i, visibleCount, galleryMore);
      });

    return (
      <div className={`Brazzers${className ? `  ${className}` : ''}`}>
        {imagesComponents}
      </div>
    );
  }
}

Brazzers.propTypes = {
  count: PropTypes.number,
  images: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.string),
    PropTypes.arrayOf(PropTypes.object)
  ]).isRequired,
  className: PropTypes.string,
  link: PropTypes.string.isRequired,
  linkState: PropTypes.objectOf(PropTypes.node),
  disableLazyImages: PropTypes.bool,
  target: PropTypes.string,
  alt: PropTypes.string.isRequired
};

Brazzers.defaultProps = {
  count: 5,
  className: null,
  disableLazyImages: false,
  target: null,
  linkState: null
};

export default Brazzers;
