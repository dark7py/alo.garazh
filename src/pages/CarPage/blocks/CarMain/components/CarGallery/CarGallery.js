import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import ImageGallery from 'react-image-gallery';

import { photosType } from 'types/Car';

import './CarGallery.scss';

import MobileGallery from 'components/MobileGallery';
import { getImages } from '../../utils';

const CarGallery = ({
  img, alt, photos, isMobile, link
}) => {
  const { images, isDefaultImg } = getImages(photos, img, alt);

  return (
    <div className={classnames({
      'car-gallery': true,
      'car-gallery--default-img': isDefaultImg
    })}
    >
      {
        isMobile ? (
          <MobileGallery images={images} link={link} alt={alt} />
        ) : (
          <ImageGallery
            items={images}
            showPlayButton={false}
            showThumbnails={images.length > 1}
            showFullscreenButton={false}
          />
        )
      }
    </div>
  );
};

CarGallery.propTypes = {
  img: PropTypes.string.isRequired,
  link: PropTypes.string,
  photos: photosType,
  isMobile: PropTypes.bool,
  alt: PropTypes.string.isRequired
};

CarGallery.defaultProps = {
  photos: [],
  link: null,
  isMobile: false
};

export default CarGallery;
