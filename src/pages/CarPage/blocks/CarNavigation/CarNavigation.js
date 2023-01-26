import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import './CarNavigation.scss';

const CarNavigation = (props) => {
  const { carId, city, backLocation } = props;

  return (
    <nav className="car-navigation">
      <Link
        to={{
          pathname: backLocation ? backLocation.pathname : `/${city}`,
          search: backLocation && backLocation.search,
          hash: backLocation && backLocation.hash,
          state: carId
        }}
        className="car-navigation__back-link"
      >
        Все объявления
      </Link>
    </nav>
  );
};

CarNavigation.propTypes = {
  carId: PropTypes.number.isRequired,
  city: PropTypes.string.isRequired,
  backLocation: PropTypes.objectOf(PropTypes.node)
};

CarNavigation.defaultProps = {
  backLocation: null
};

export default CarNavigation;
