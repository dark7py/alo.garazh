import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import PageContainer from 'components/PageContainer';
import MainTitle from 'blocks/MainTitle';
import Filters from 'blocks/Filters';
import CarOffers from 'blocks/CarOffers';
import RecommendedOffers from 'blocks/RecommendedOffers';
import { CarType, locationType } from 'types';

import SubscribeForm from 'blocks/SubscribeForm';

import { getDescription, getTitle } from './utils';
import Helmet from './Helmet';

import './MainPage.scss';

const MainPage = (props) => {
  const {
    cars,
    fetchCars,
    city,
    brandName,
    modelName,
    park,
    location,
    recommendedCars,
    canonicalURL
  } = props;

  const cityName = useMemo(
    () => (location.pathname === '/' ? null : city),
    [city]
  );
  const title = useMemo(
    () => getTitle(cityName, brandName, modelName, park),
    [cityName, brandName, modelName, park]
  );
  const description = useMemo(
    () => getDescription(cityName, brandName, modelName),
    [cityName, brandName, modelName]
  );

  return (
    <>
      <Helmet
        title={title}
        description={description}
        canonicalURL={canonicalURL}
      />
      <PageContainer>
        <div className="main-page__header">
          <MainTitle />
          <Filters />
        </div>
        <CarOffers
          cars={cars}
          fetchCars={fetchCars}
          backLocation={location}
          showPark
        />
        <RecommendedOffers
          offers={recommendedCars}
          backLocation={location}
        />
        <SubscribeForm />
      </PageContainer>
    </>
  );
};

MainPage.propTypes = {
  cars: PropTypes.arrayOf(PropTypes.shape(CarType)),
  recommendedCars: PropTypes.arrayOf(PropTypes.shape(CarType)),
  fetchCars: PropTypes.func.isRequired,
  city: PropTypes.string.isRequired,
  match: PropTypes.shape({
    params: PropTypes.object,
    isExact: PropTypes.bool,
    path: PropTypes.string,
    url: PropTypes.string
  }).isRequired,
  brandName: PropTypes.string,
  modelName: PropTypes.string,
  park: PropTypes.shape({
    name: PropTypes.string,
    slug: PropTypes.string
  }),
  location: PropTypes.shape(locationType),
  canonicalURL: PropTypes.string
};

MainPage.defaultProps = {
  cars: null,
  recommendedCars: null,
  location: null,
  brandName: null,
  modelName: null,
  park: null,
  canonicalURL: null
};

export default MainPage;
