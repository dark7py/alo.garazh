/* eslint-disable camelcase */
import React from 'react';
import PropTypes from 'prop-types';

import { CarType } from 'types';

import CarOffersGallery from 'components/CarOffersGallery';
import ScheduleCards from 'components/ScheduleCards';

import { getImageAltText } from '../utils';

import CarOfferDescription from '../CarOfferDescription';

import '../CarOffer.scss';
import './CarOfferHorizontal.scss';

const CarOfferHorizontal = (props) => {
  const {
    carOffer, showPark, cityName, backLocation
  } = props;

  const {
    id, zone_name, photos, img
  } = carOffer;

  const link = `/${zone_name}/arenda_auto_${carOffer.id}`;

  return (
    <div id={id} className="car-offer">
      <div className="car-offer__image">
        <CarOffersGallery
          img={img}
          photos={photos}
          link={link}
          linkState={backLocation}
          alt={getImageAltText(carOffer, cityName)}
        />
      </div>
      <CarOfferDescription
        link={link}
        linkState={backLocation}
        carOffer={carOffer}
        showPark={showPark}
      />
      <div className="car-offer__schedule-cards">
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
          showArrowsByHover
          showArrows
        />
      </div>
    </div>
  );
};

CarOfferHorizontal.propTypes = {
  carOffer: PropTypes.shape(CarType).isRequired,
  showPark: PropTypes.bool,
  cityName: PropTypes.string.isRequired,
  backLocation: PropTypes.objectOf(PropTypes.node)
};

CarOfferHorizontal.defaultProps = {
  showPark: true,
  backLocation: null
};

export default CarOfferHorizontal;
