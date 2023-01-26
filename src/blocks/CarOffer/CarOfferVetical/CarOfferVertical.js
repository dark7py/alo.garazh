/* eslint-disable camelcase */
import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import { CarType } from 'types/Car';

import MobileGallery from 'components/MobileGallery';
import BrazzersGallery from 'components/BrazzersGallery';
import ScheduleCards from 'components/ScheduleCards';

import '../CarOffer.scss';
import './CarOfferVertical.scss';

import CarOfferDescription from '../CarOfferDescription';
import CarOfferCarTitle from '../CarOfferCarTitle';

import { getImages, getImageAltText } from '../utils';

const CarOffer = (props) => {
  const {
    carOffer, showPark, isMobile,
    disableLazyImages, cityName, backLocation
  } = props;

  const {
    id, completedCallDate,
    zone_name, photos, img
  } = carOffer;

  const link = `/${zone_name}/arenda_auto_${carOffer.id}`;

  const { images, isDefaultImg } = getImages(photos, img);

  const galleryClassnames = classnames({
    'car-offer__gallery': true,
    'car-offer__gallery--desktop': !isMobile,
    'car-offer__gallery--desktop-single': images.length === 1,
    'car-offer__gallery--default': isDefaultImg
  });

  const Gallery = isMobile ? MobileGallery : BrazzersGallery;

  return (
    <div id={id} className="car-offer car-offer--vertical">
      <div className="car-offer__clicker-container">
        <CarOfferCarTitle
          carOffer={carOffer}
          link={link}
          linkState={backLocation}
        />
        <div className={galleryClassnames}>
          <Gallery
            images={images}
            link={link}
            linkState={backLocation}
            disableLazyImages={disableLazyImages}
            alt={getImageAltText(carOffer, cityName)}
          />
        </div>
        <CarOfferDescription
          carOffer={carOffer}
          link={link}
          showPark={showPark}
          id={id}
          completedCallDate={completedCallDate}
        />
      </div>
      <div className="car-offer__schedule-cards--vertical">
        <ScheduleCards
          carId={id}
          scheduleRental={carOffer.scheduleRental}
          schedulePiecework={carOffer.schedulePiecework}
          minRentalPeriod={carOffer.minRentalPeriod}
          dailyRent={carOffer.dailyRent}
          depositCost={carOffer.depositCost}
          currency={carOffer.currency}
          commission={carOffer.commission}
          completedCallDate={carOffer.completedCallDate}
        />
      </div>
    </div>
  );
};

CarOffer.propTypes = {
  carOffer: PropTypes.shape(CarType).isRequired,
  showPark: PropTypes.bool,
  isMobile: PropTypes.bool,
  disableLazyImages: PropTypes.bool,
  cityName: PropTypes.string.isRequired,
  backLocation: PropTypes.objectOf(PropTypes.node)
};

CarOffer.defaultProps = {
  showPark: true,
  isMobile: false,
  disableLazyImages: false,
  backLocation: null
};

export default CarOffer;
