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
            content={`${process.env.APP_HOST}/feedback`}
          />
        ]
      }
    <meta
      property="og:title"
      content="Задайте вопрос - Объявления Яндекс.Гараж"
    />

    <meta charSet="utf-8" />
    <title>Задайте вопрос - Объявления Яндекс.Гараж</title>
  </Helmet>
);
