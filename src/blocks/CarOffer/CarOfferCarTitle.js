/* eslint-disable camelcase */
import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import { CarType } from 'types';

const CarOfferCarTitle = ({ carOffer, link, linkState }) => {
  const { carBrand, carModel, year } = carOffer;

  return (
    <div>
      <Link
        to={{
          pathname: link,
          state: linkState
        }}
        className="car-offer__link"
      >
        <span className="car-offer__title">
          {`${carBrand.name} ${carModel.name} `}
        </span>
        <div className="car-offer__clicker" />
      </Link>
      <span className="car-offer__year">
        {year}
      </span>
    </div>
  );
};

CarOfferCarTitle.propTypes = {
  carOffer: PropTypes.shape(CarType).isRequired,
  link: PropTypes.string.isRequired,
  linkState: PropTypes.objectOf(PropTypes.node)
};

CarOfferCarTitle.defaultProps = {
  linkState: null
};

export default CarOfferCarTitle;
