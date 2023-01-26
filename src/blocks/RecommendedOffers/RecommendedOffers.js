import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { CarType } from 'types';

import CarOffer from '../CarOffer';

import './RecommendedOffers.scss';

class RecommendedOffers extends PureComponent {
  renderParkItems = () => {
    const { offers, backLocation } = this.props;

    return offers
      .map((carOffer) => (
        <CarOffer
          key={carOffer.id}
          carOffer={carOffer}
          showPark={false}
          backLocation={backLocation}
        />
      ));
  };

  render() {
    const { offers } = this.props;

    if (!offers || offers.length < 2) {
      return null;
    }

    return (
      <div>
        <div className="recommended-offers__title">
          Возможно, вас заинтересуют другие объявления:
        </div>
        <div>
          {this.renderParkItems()}
        </div>
      </div>
    );
  }
}

RecommendedOffers.propTypes = {
  offers: PropTypes.arrayOf(PropTypes.shape(CarType)),
  backLocation: PropTypes.objectOf(PropTypes.node)
};

RecommendedOffers.defaultProps = {
  offers: null,
  backLocation: null
};

export default RecommendedOffers;
