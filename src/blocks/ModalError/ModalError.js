import React from 'react';
import PropTypes from 'prop-types';

import './ModalError.scss';

const ModalError = ({ errorModal }) => (
  <div className="modal-error">
    { errorModal }
  </div>
);

ModalError.propTypes = {
  errorModal: PropTypes.string.isRequired
};

export default ModalError;
