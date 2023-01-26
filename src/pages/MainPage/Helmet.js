/* eslint-disable max-len, camelcase */
import React from 'react';
import PropTypes from 'prop-types';

import { Helmet } from 'react-helmet';

const HelmetComponent = (props) => {
  const {
    title,
    description,
    canonicalURL
  } = props;

  return (
    <Helmet>
      {canonicalURL && <link rel="canonical" href={canonicalURL} />}
      <meta property="og:type" content="website" />
      <meta
        property="og:title"
        content={title}
      />
      <meta
        property="og:descriptions"
        content={description}
      />
      <meta charSet="utf-8" />
      <title>{title}</title>
      <meta
        name="description"
        content={description}
      />
    </Helmet>
  );
};

HelmetComponent.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  canonicalURL: PropTypes.string
};

HelmetComponent.defaultProps = {
  canonicalURL: null
};

export default HelmetComponent;
