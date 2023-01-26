/* eslint-disable camelcase */
import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { cityIn } from 'lvovich';

import { CarType } from 'types';

export const HelmetCar = ({ car, url, zones }) => {
  const {
    carBrand, carModel, zone_name, img
  } = car;

  const city = zones && zones.find(({ code }) => code === zone_name);
  const cityName = cityIn((city && city.name) || '');

  return (
    <Helmet>
      <meta property="og:type" content="website" />
      {
        process.env.APP_HOST && [
          <meta
            key="url"
            property="og:url"
            content={`${process.env.APP_HOST}${url}`}
          />,
          <meta
            key="image"
            property="og:image"
            content={`${process.env.APP_HOST}${img}`}
          />
        ]
      }
      <meta
        property="og:title"
        content={`Аренда авто ${carBrand.name} ${carModel.name} ${car.year} для такси в ${cityName} - Объявления Яндекс.Гараж`}
      />
      <meta charSet="utf-8" />
      <title>{`Аренда авто ${carBrand.name} ${carModel.name} ${car.year} для такси в ${cityName} - Объявления Яндекс.Гараж`}</title>
    </Helmet>
  );
};

HelmetCar.propTypes = {
  car: PropTypes.shape(CarType).isRequired,
  url: PropTypes.string.isRequired,
  zones: PropTypes.arrayOf(PropTypes.object).isRequired
};

export default HelmetCar;
