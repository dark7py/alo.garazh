import React from 'react';
import PropTypes from 'prop-types';

import './Subtitle.scss';

const Subtitle = ({ children }) => (
  <div className="car-main__subtitle">
    {children}
  </div>
);

Subtitle.propTypes = {
  children: PropTypes.node.isRequired
};

export default Subtitle;
