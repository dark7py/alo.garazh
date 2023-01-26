/* eslint-disable max-len, camelcase */
import React from 'react';
import { Helmet } from 'react-helmet';

export default () => (
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
      content="Все города - Объявления Яндекс.Гараж"
    />

    <meta charSet="utf-8" />
    <title>Все города - Объявления Яндекс.Гараж</title>
  </Helmet>
);
