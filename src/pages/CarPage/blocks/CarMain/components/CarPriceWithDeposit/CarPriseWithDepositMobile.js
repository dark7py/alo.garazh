import React from 'react';
import PropTypes from 'prop-types';

import { priceFormatter } from 'utils';

import './CarPriseWithDepositMobile.scss';

const CarPriseWithDeposit = ({ dailyRent, depositCost, commission }) => {
  const depositText = (depositCost > 0)
    ? `– Залог ${priceFormatter(depositCost)}₽`
    : '– Без залога';

  const commissionText = commission && (commission > 0)
    ? `– Комиссия ${commission}%`
    : '– Без комиссии';

  return (
    <div>
      <div className="car-main-mobile__car-price">
        <span>{priceFormatter(dailyRent)}</span>
        <span>₽/сутки</span>
      </div>
      <div className="car-main-mobile__car-deposite">
        <div>
          <span>{depositText}</span>
        </div>
        <div>
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
