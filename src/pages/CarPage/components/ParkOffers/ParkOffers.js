import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import CarOffer from 'blocks/CarOffer';
import CarOffersMini from 'components/CarOffersMini';
import { CarType } from 'types';

import './ParkOffers.scss';

class ParkOffers extends PureComponent {
  componentDidMount() {
    const { offers, parkId, fetchParkCars } = this.props;
    if (!offers.length) {
      fetchParkCars(parkId);
    }
  }

  renderParkItems = () => {
    const {
      isMobile, offers, carId
    } = this.props;
    const filteredOffers = offers.filter((offer) => offer.id !== carId);

    if (isMobile) {
      return <CarOffersMini offers={filteredOffers} />;
    }

    return filteredOffers
      .map((carOffer) => (
        <CarOffer
          key={carOffer.id}
          carOffer={carOffer}
          showPark={false}
        />
      ));
  };

  render() {
    const { offers } = this.props;

    if (offers.length < 2) {
      return null;
    }

    return (
      <div>
        <div className="park-offers__title">
          Bсе объявления парка
        </div>
        {this.renderParkItems()}
      </div>
    );
  }
}

ParkOffers.propTypes = {
  offers: PropTypes.arrayOf(PropTypes.shape(CarType)),
  parkId: PropTypes.number.isRequired,
  carId: PropTypes.number.isRequired,
  fetchParkCars: PropTypes.func.isRequired,
  isMobile: PropTypes.bool
};

ParkOffers.defaultProps = {
  offers: [],
  isMobile: false
};

export default ParkOffers;
