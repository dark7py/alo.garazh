import React from 'react';
import PropTypes from 'prop-types';
import { JsonLd } from 'react-schemaorg';

import PageContainer from 'components/PageContainer';


import { CarType, matchType, locationType } from 'types';

import CarMain from './blocks/CarMain';
import CarNavigation from './blocks/CarNavigation';

import ParkOffers from './components/ParkOffers';
import Helmet from './Helmet';

const CarPage = (props) => {
  const {
    car,
    parkCars,
    match,
    location,
    allZones,
    isMobile,
    fetchParkCars
  } = props;

  return (
    <>
      <Helmet
        car={car}
        url={match.url}
        zones={allZones}
      />
      <JsonLd
        item={{
          '@context': 'https://schema.org/',
          '@type': 'Product',
          name: `${car.carBrand.name} ${car.carModel.name} ${car.year}`,
          image: car.img,
          offers: {
            '@type': 'Offer',
            price: car.dailyRent,
            priceCurrency: 'RUB'
          }
        }}
      />
      <PageContainer>
        <CarNavigation carId={car.id} backLocation={location.state} />
        {/* eslint-disable-next-line react/jsx-props-no-spreading */}
        <CarMain {...car} />
        <ParkOffers
          carId={car.id}
          parkId={car.companyId}
          offers={parkCars}
          backLocation={location.state}
          isMobile={isMobile}
          fetchParkCars={fetchParkCars}
        />
      </PageContainer>
    </>
  );
};


CarPage.propTypes = {
  car: PropTypes.shape(CarType).isRequired,
  parkCars: PropTypes.arrayOf(PropTypes.shape(CarType)),
  match: PropTypes.shape(matchType).isRequired,
  url: PropTypes.string,
  location: PropTypes.shape(locationType).isRequired,
  allZones: PropTypes.arrayOf(PropTypes.object).isRequired,
  isMobile: PropTypes.bool,
  fetchParkCars: PropTypes.func.isRequired
};

CarPage.defaultProps = {
  parkCars: [],
  url: null,
  isMobile: false
};

export default CarPage;
