/* eslint-disable camelcase */
import React from 'react';
import PropTypes from 'prop-types';

import { carPageRentTermsList as rentTerms } from 'pages/CarPage/blocks/CarMain/configs';

import Subtitle from '../Subtitle';

import './RentTerms.scss';

const RentTerms = (props) => {
  const { schedule, minRentalPeriod } = props;
  if (!schedule && !minRentalPeriod) {
    return null;
  }

  return (
    <>
      <Subtitle>
        Условия аренды
      </Subtitle>
      {rentTerms.map(({ code, name, renderValue }) => {
        if (props[code] === null || props[code] === undefined) {
          return null;
        }

        return (
          <div
            key={code}
            className="car-main__rent-terms"
          >
            <span className="car-main__rent-terms-key">
              {name}
            </span>
            <span>
              {renderValue(props[code])}
            </span>
          </div>
        );
      })}
    </>
  );
};

RentTerms.propTypes = {
  schedule: PropTypes.oneOfType([PropTypes.array, PropTypes.string]),
  minRentalPeriod: PropTypes.number
};

RentTerms.defaultProps = {
  schedule: null,
  minRentalPeriod: null
};

export default RentTerms;
