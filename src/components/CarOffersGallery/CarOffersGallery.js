import React from 'react';
import PropTypes from 'prop-types';

import { getOffersPhotos } from 'utils';
import { photosType } from 'types/Car';

import BrazzersGallery from '../BrazzersGallery';

const CarOffersGallery = (props) => {
  const {
    img, photos, link, linkState, alt, target
  } = props;
  const images = getOffersPhotos(img, photos);

  if (photos.length < 2) {
    // Если одна картинка
    return (
      <img
        style={{ width: '100%', borderRadius: 8 }}
        src={images[0].original || img}
        alt={alt}
      />
    );
  }

  return (
    <BrazzersGallery
      images={images}
      count={5}
      link={link}
      linkState={linkState}
      target={target}
      alt={alt}
    />
  );
};

CarOffersGallery.propTypes = {
  photos: photosType,
  img: PropTypes.string.isRequired,
  link: PropTypes.string,
  linkState: PropTypes.objectOf(PropTypes.node),
  alt: PropTypes.string.isRequired,
  target: PropTypes.string
};

CarOffersGallery.defaultProps = {
  photos: [],
  link: null,
  target: '_self',
  linkState: null
};

export default CarOffersGallery;
