/* eslint-disable max-len, camelcase */
import React from 'react';
import PropTypes from 'prop-types';
import { cityIn } from 'lvovich';
import { Helmet } from 'react-helmet';

const ModelHelmet = ({ city }) => (
  <Helmet>
    <meta property="og:type" content="website" />
    {
        process.env.APP_HOST && [
          <meta
            key="url"
            property="og:url"
            content={`${process.env.APP_HOST}/cities`}
          />
        ]
      }
    <meta
      property="og:title"
      content={`Все бренды и модели в ${cityIn(city)} - Объявления Яндекс.Гараж`}
    />
    <meta charSet="utf-8" />
    <title>{`Все бренды и модели в ${cityIn(city)} - Объявления Яндекс.Гараж`}</title>
  </Helmet>
);

ModelHelmet.propTypes = {
  city: PropTypes.string.isRequired
};

export default ModelHelmet;
