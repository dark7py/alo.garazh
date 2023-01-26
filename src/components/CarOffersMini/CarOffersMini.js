import React from 'react';
import PropTypes from 'prop-types';
import { CarType } from 'types';

import CarOfferMini from './CarOfferMini';

const CarOffersMini = ({ offers }) => (
  <div>
    {offers.map((carOffer) => (
      <CarOfferMini
        key={carOffer.id}
        carOffer={carOffer}
      />
    ))}
  </div>
);

CarOffersMini.propTypes = {
  offers: PropTypes.arrayOf(
    PropTypes.shape(CarType)
  ).isRequired
};


export default CarOffersMini;
