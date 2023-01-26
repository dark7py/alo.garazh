import React from 'react';
import PropTypes from 'prop-types';

import CallButton from 'blocks/CallButton';

import { addCurrencyToNumber } from 'utils';
import { schedule as scheduleConfig } from '../configs';

const RentalCard = (props) => {
  const {
    carId,
    buttonText,
    scheduleKind,
    costPerDay,
    depositAmount,
    currency,
    commission,
    minRentalPeriod
  } = props;

  const params = {
    schedule_kind: scheduleKind,
    commission,
    cost_per_day: costPerDay,
    deposit_amount: depositAmount,
    min_rental_period: minRentalPeriod
  };

  const costPerDayWithCurrency = addCurrencyToNumber(currency, costPerDay);
  const depositAmountWithCurrency = addCurrencyToNumber(currency, depositAmount);

  return (
    <div className="schedule_card__wrapper">
      <div className="schedule_card">
        <div className="schedule_card__values">
          <div className="schedule_card__title">
            {scheduleConfig[scheduleKind]}
          </div>
          <div className="schedule_card__price-container">
            <span className="schedule_card__price">
              {costPerDayWithCurrency}
            </span>
            <span>/ день</span>
          </div>
          <div>
            {
              depositAmount
                ? `+${depositAmountWithCurrency} залог`
                : 'Без залога'
            }
          </div>
          <div>
            {
              commission
                ? `+${commission}% комиссия`
                : 'Без комиссии'
            }
          </div>
        </div>
        <CallButton
          id={carId}
          params={params}
          type="button"
          className="schedule_card__button"
        >
          {buttonText}
        </CallButton>
      </div>
    </div>
  );
};

RentalCard.propTypes = {
  carId: PropTypes.number.isRequired,
  buttonText: PropTypes.string,
  scheduleKind: PropTypes.string,
  costPerDay: PropTypes.number,
  depositAmount: PropTypes.number,
  currency: PropTypes.string,
  commission: PropTypes.number,
  minRentalPeriod: PropTypes.number
};

RentalCard.defaultProps = {
  scheduleKind: 'not_set',
  costPerDay: 0,
  depositAmount: 0,
  currency: 'RUB',
  commission: 0,
  minRentalPeriod: 1,
  buttonText: 'Позвонить'
};

export default RentalCard;
