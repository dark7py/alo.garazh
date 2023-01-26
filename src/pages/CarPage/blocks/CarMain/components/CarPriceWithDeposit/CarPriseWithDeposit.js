import React from 'react';
import PropTypes from 'prop-types';

import { priceFormatter } from 'utils';

import './CarpriseWithDeposit.scss';

const CarPriseWithDeposit = ({ dailyRent, depositCost, commission }) => {
  const depositText = (depositCost > 0)
    ? `Залог ${priceFormatter(depositCost)}₽`
    : 'Без залога';

  const commissionText = commission && (commission > 0)
    ? `Комиссия ${commission}%`
    : 'Без комиссии';

  return (
    <div className="car-main__car-rent-with-deposit">
      <div>
        <span className="car-main__car-rent">
          {priceFormatter(dailyRent)}
          <small>₽/сутки</small>
        </span>
      </div>
      <div className="car-main__car-deposit-commission">
        <div className="car-main__car-deposit">
          <img
            src="/images/icon-minus.svg"
            alt="dash"
          />
          <span>{depositText}</span>
        </div>
        <div className="car-main__car-deposit">
          <img
            src="/images/icon-minus.svg"
            alt="dash"
          />
          <span>
            {
              commission !== null
                ? commissionText : 'Комиссия не указана'
            }
          </span>
        </div>
      </div>
    </div>
  );
};

CarPriseWithDeposit.propTypes = {
  dailyRent: PropTypes.number.isRequired,
  depositCost: PropTypes.number.isRequired,
  commission: PropTypes.number
};

CarPriseWithDeposit.defaultProps = {
  commission: null
};

export default CarPriseWithDeposit;
