import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { addCurrencyToNumber } from 'utils';
import { CarType } from 'types';

import './CarOfferMini.scss';


const CarOfferMini = ({ carOffer }) => {
  const {
    carBrand, carModel, year,
    tags, img, photos, dailyRent, depositCost,
    fuelType, gearBox, zone_name: zoneName, currency
  } = carOffer;

  const image = photos.length && photos[0].resolutions
    ? photos[0].resolutions[1] && photos[0].resolutions[1].url : img;

  const dailyRentWithCurrency = addCurrencyToNumber(currency, dailyRent);
  const depositCostWithCurrency = addCurrencyToNumber(currency, depositCost);

  return (
    <Link to={`/${zoneName}/arenda_auto_${carOffer.id}`} className="car-offer-mini">
      <div className="car-offer-mini__image">
        <img src={image} alt="car" />
      </div>
      <div className="car-offer-mini__list">
        <div className="car-offer-mini__item">
          <div>{`${carBrand.name} ${carModel.name}, ${year}`}</div>
        </div>
        <div className="car-offer-mini__item">
          <div>
            {`${dailyRentWithCurrency} — ${depositCost > 0
              ? `Залог ${depositCostWithCurrency}` : 'Нет залога'}`}
          </div>
        </div>
        <div className="car-offer-mini__item">
          <div>{`${fuelType.name}, ${gearBox.name}`}</div>
        </div>
        {
          !!tags.length && (
            <div className="car-offer-mini__item">
              <div>{`${tags.join(', ')}`}</div>
            </div>
          )
        }
      </div>
    </Link>
  );
};

CarOfferMini.propTypes = {
  carOffer: PropTypes.shape(CarType).isRequired
};

export default CarOfferMini;
