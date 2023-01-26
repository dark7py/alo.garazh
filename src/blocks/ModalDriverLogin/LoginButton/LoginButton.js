import React from 'react';
import PropTypes from 'prop-types';

import Loader from 'components/Loader';

const LoginButton = ({ onClick, isProcessing }) => (
  <button
    onClick={onClick}
    type="submit"
    className="driver-login-form__submit"
  >
    {
        isProcessing ? <Loader /> : 'Войти'
      }
  </button>
);

LoginButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  isProcessing: PropTypes.bool
};

LoginButton.defaultProps = {
  isProcessing: false
};

export default LoginButton;
