import React from 'react';
import PropTypes from 'prop-types';

import './CompanyCard.scss';

const CompanyCard = (props) => {
  const {
    companyName,
    companyRating,
    certifiedPark,
    address
  } = props;

  return (
    <div className="company-card">
      <div className="company-card__title">
        {companyName}
      </div>
      <div className="company-card__row">
        {
          companyRating && (
            <div className="company-card__row__item">
              <img
                src="/images/icon-star-color.svg"
                alt="certifiedPark"
                className="car-offer__star"
              />
              {`${companyRating} из 10 баллов`}
            </div>
          )
        }
        {
          certifiedPark && (
            <div className="company-card__row__item">
              <img
                src="/images/icon-medal.svg"
                alt="certifiedPark"
                className="car-offer__certified"
              />
              Есть сертификат
            </div>
          )
        }
      </div>
      <div>{address}</div>
    </div>
  );
};

CompanyCard.propTypes = {
  companyName: PropTypes.string,
  companyRating: PropTypes.number,
  address: PropTypes.string,
  certifiedPark: PropTypes.bool
};

CompanyCard.defaultProps = {
  companyName: '',
  companyRating: null,
  address: null,
  certifiedPark: null
};

export default CompanyCard;
