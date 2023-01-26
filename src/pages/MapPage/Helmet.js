import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';

import { composeCarsURL } from 'modules/router/utils';

const HelmetComponent = (props) => {
  const { isCanonical, disableRobotsFollow } = props;
  const host = process.env.APP_HOST || '';
  const href = composeCarsURL({ host, isMap: true });

  return (
    <Helmet>
      <meta property="og:type" content="website" />
      {isCanonical && <link rel="canonical" href={href} />}
      {disableRobotsFollow && <meta name="robots" content="nofollow" />}
      {host && (
        <meta
          key="url"
          property="og:url"
          content={href}
        />
      )}
      <meta
        property="og:title"
        content="Карта - Объявления Яндекс.Гараж"
      />
      <meta charSet="utf-8" />
      <title>Карта - Объявления Яндекс.Гараж</title>
    </Helmet>
  );
};

HelmetComponent.propTypes = {
  isCanonical: PropTypes.bool.isRequired,
  disableRobotsFollow: PropTypes.bool.isRequired
};

export default HelmetComponent;
