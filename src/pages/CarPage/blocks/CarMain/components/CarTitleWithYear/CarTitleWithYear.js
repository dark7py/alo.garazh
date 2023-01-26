import React from 'react';
import PropTypes from 'prop-types';

import './CarTitleWithYear.scss';

const CarTitleWithYear = ({ title, year }) => (
  <h1
    className="car-title-with-year"
  >
    <span>
      {`${title} `}
    </span>
    <span>
      {year}
    </span>
  </h1>
);

CarTitleWithYear.propTypes = {
  title: PropTypes.string.isRequired,
  year: PropTypes.number.isRequired
};

export default CarTitleWithYear;
