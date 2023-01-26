/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';
import MobileFilters from './MobileFilters';
import DesktopFilters from './DesktopFilters';

const Filters = ({ isMobile, ...otherProps }) => {
  if (isMobile) {
    return <MobileFilters {...otherProps} />;
  }

  return <DesktopFilters {...otherProps} />;
};

Filters.propTypes = {
  isMobile: PropTypes.bool.isRequired
};

export default Filters;
