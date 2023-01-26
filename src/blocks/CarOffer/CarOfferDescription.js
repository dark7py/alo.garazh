/* eslint-disable camelcase */
import React from 'react';
import PropTypes from 'prop-types';

import { CarType } from 'types';

import CarOfferCarTitle from './CarOfferCarTitle';

import { carOfferFuelTypes, carOfferGearboxes } from './configs';

const CarOfferDescription = (props) => {
  const {
    carOffer, link, showPark, linkState
  } = props;

  const {
    fuelType, tags, companyName, companyRating,
    gearBox, additionalInfo, certifiedPark
  } = carOffer;

  return (
    <div className="car-offer__description">
      <div className="car-offer__description-title">
        <CarOfferCarTitle
          carOffer={carOffer}
          link={link}
          linkState={linkState}
        />
      </div>
      <div className="car-offer__property-container">
        <span className="car-offer__property">
          {carOfferGearboxes[gearBox.code] && (
            <>
              <img
                src={carOfferGearboxes[gearBox.code].imgSrc}
                alt={carOfferGearboxes[gearBox.code].imgSrc}
              />
              {carOfferGearboxes[gearBox.code].label}
            </>
          )}
        </span>
        <span className="car-offer__property">
          {carOfferFuelTypes[fuelType.code] && (
            <>
              <img
                src={carOfferFuelTypes[fuelType.code].imgSrc}
                alt={carOfferFuelTypes[fuelType.code].imgSrc}
              />
              {carOfferFuelTypes[fuelType.code].label}
            </>
          )}
        </span>
        <span className="car-offer__property">
          {carOffer.selfEmployedPark && (
            <>
              <img
                src="/images/smz.svg"
                alt="smz"
              />
              Работает с самозанятыми
            </>
          )}
        </span>
      </div>
      {
        !!tags.length && (
          <div className="car-offer__bonuses">
            {`Бонусы парка: ${tags.join(', ')}`}
          </div>
        )
      }
      {additionalInfo && (
        <div className="car-offer__comment-container">
          <div className="car-offer__comment">
            {additionalInfo}
          </div>
        </div>
      )}
      {showPark && (
        <div className="car-offer__taxi-station">
          <span>Парк: </span>
          <span>{companyName}</span>
          {
            companyRating && (
              <>
                <img
                  src="/images/icon-star-color.svg"
                  alt="certifiedPark"
                  className="car-offer__star"
                />
                {`${companyRating} из 10`}
              </>
            )
          }
          {
            certifiedPark && (
              <img
                src="/images/icon-medal.svg"
                alt="certifiedPark"
                className="car-offer__certified"
              />
            )
          }
        </div>
      )}
    </div>
  );
};

CarOfferDescription.propTypes = {
  carOffer: PropTypes.shape(CarType).isRequired,
  link: PropTypes.string.isRequired,
  showPark: PropTypes.bool,
  linkState: PropTypes.objectOf(PropTypes.node)
};

CarOfferDescription.defaultProps = {
  showPark: false,
  linkState: null
};

export default CarOfferDescription;
