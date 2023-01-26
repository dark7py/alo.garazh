/* eslint-disable no-underscore-dangle */
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import isEqual from 'lodash.isequal';

import { CarOfferVertical } from 'blocks/CarOffer';
import Loader from 'components/Loader';

import { getMapCars } from 'modules/data/api';
import { locationType, historyType } from 'types';

import CompanyCard from '../../components/CompanyCard';

import { groupOffersByCompany } from '../../utils';

import './MapOffersPanel.scss';

class MapOffersPanel extends PureComponent {
  _isMounted = false;

  constructor(props) {
    super(props);

    this.state = {
      offersByCompany: null
    };
  }

  componentDidMount() {
    this._isMounted = true;
    const { selectedOffersPointsIds } = this.props;

    getMapCars(selectedOffersPointsIds).then((res) => {
      const offers = res.payload.items;
      const offersByCompany = groupOffersByCompany(offers);
      if (this._isMounted) {
        this.setState({ offersByCompany });

        if (window.ym) {
          // Яндекс.Метрика, цель: Открытие карточки карты
          window.ym(window.ENV.REACT_APP_YA_METRICS_ID,
            'reachGoal', 'map-list-open');
        }
      }
    });
  }

  componentDidUpdate(prevProps) {
    const { selectedOffersPointsIds } = this.props;

    if (!isEqual(prevProps.selectedOffersPointsIds, selectedOffersPointsIds)) {
      getMapCars(selectedOffersPointsIds).then(({ payload }) => {
        const offers = payload.items;

        const offersByCompany = groupOffersByCompany(offers);
        if (this._isMounted) {
          this.setState({ offersByCompany });
        }
      });
    }
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  renderOffers = () => {
    const { offersByCompany } = this.state;
    const { location } = this.props;

    return Object.keys(offersByCompany)
      .map((key) => {
        const { company, offers } = offersByCompany[key];

        return (
          <div key={key}>
            {/* eslint-disable-next-line react/jsx-props-no-spreading */}
            <CompanyCard {...company} />
            <div className="offers-map-panel__offers">
              {offers.map((offer) => (
                <CarOfferVertical
                  key={offer.id}
                  carOffer={offer}
                  showPark={false}
                  disableLazyImages
                  backLocation={location}
                />
              ))}
            </div>
          </div>
        );
      });
  };

  onClose = () => {
    const { history, location, cleanSelectedOffersPoints } = this.props;

    history.push({
      hash: null,
      search: location.search
    });

    cleanSelectedOffersPoints();
  };

  render() {
    const { offersByCompany } = this.state;

    return (
      <div className="offers-map-panel">
        <button
          type="button"
          className="offers-map-panel__close"
          onClick={this.onClose}
        />
        <div className="offers-map-panel__scroll">
          {
            offersByCompany
              ? this.renderOffers()
              : <Loader />
          }
        </div>
      </div>
    );
  }
}

MapOffersPanel.propTypes = {
  history: PropTypes.shape(historyType).isRequired,
  location: PropTypes.shape(locationType).isRequired,
  cleanSelectedOffersPoints: PropTypes.func.isRequired,
  selectedOffersPointsIds: PropTypes.arrayOf(PropTypes.string).isRequired
};

export default MapOffersPanel;
