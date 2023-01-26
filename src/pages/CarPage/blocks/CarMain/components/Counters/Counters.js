import React from 'react';
import PropTypes from 'prop-types';

export const Counters = ({ viewedCount, callsCount }) => {
  if (!viewedCount && !callsCount) {
    return null;
  }

  return (
    <div className="car-main__counters">
      {
        viewedCount > 30 && (
          <div className="car-main__counters__item">
            <img
              src="/images/icon-eye.svg"
              style={{ width: '21px' }}
              alt="views"
            />
            {` ${viewedCount}`}
          </div>
        )
      }
      {
        callsCount > 5 && (
          <div className="car-main__counters__item">
            <img
              src="/images/icon-phone.svg"
              style={{ width: '15px' }}
              alt="views"
            />
            {` ${callsCount}`}
          </div>
        )
      }
    </div>
  );
};

Counters.propTypes = {
  viewedCount: PropTypes.number.isRequired,
  callsCount: PropTypes.number.isRequired
};

export default Counters;
