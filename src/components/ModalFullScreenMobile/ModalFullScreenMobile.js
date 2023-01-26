import React from 'react';
import PropTypes from 'prop-types';

import './ModalFullScreenMobile.scss';

const ModalFullScreenMobile = ({ children }) => (
  <div className="fullscreen-modal">
    {children}
  </div>
);

ModalFullScreenMobile.propTypes = {
  children: PropTypes.node
};

ModalFullScreenMobile.defaultProps = {
  children: null
};

export default ModalFullScreenMobile;
