import React from 'react';
import PropTypes from 'prop-types';

import CallButton from 'blocks/CallButton';

import { addCurrencyToNumber } from 'utils';
import {
  schedule as scheduleConfig,
  salary as salaryConfig
} from '../configs';

const PieceworkCard = (props) => {
  const {
    scheduleKind,
    salary,
    currency,
    minOrderAmount,
    carId,
    buttonText
  } = props;

  const params = {
    schedule_kind: scheduleKind,
    salary,
    min_order_amount: minOrderAmount
  };

  const minOrderAmountWithCurrency = addCurrencyToNumber(currency, minOrderAmount);

  return (
    <div className="schedule_card__wrapper">
      <div className="schedule_card">
        <div className="schedule_card__values">
          <div className="schedule_card__title">
            {`Сдельная ${scheduleConfig[scheduleKind]}`}
          </div>
          <div className="schedule_card__price-container">
            <span className="schedule_card__price">
              {salaryConfig[salary]}
            </span>
          </div>
          {
            minOrderAmount
              && `Мин. сумма с заказов: ${minOrderAmountWithCurrency}`
          }
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

PieceworkCard.propTypes = {
  carId: PropTypes.number.isRequired,
  buttonText: PropTypes.string,
  scheduleKind: PropTypes.string,
  currency: PropTypes.string,
  salary: PropTypes.string,
  minOrderAmount: PropTypes.number
};

PieceworkCard.defaultProps = {
  scheduleKind: 'not_set',
  currency: 'RUB',
  salary: null,
  minOrderAmount: 0,
  buttonText: 'Позвонить'
};

export default PieceworkCard;
