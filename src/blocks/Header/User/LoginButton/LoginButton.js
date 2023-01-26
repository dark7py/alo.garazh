import React from 'react';
import PropTypes from 'prop-types';

import './LoginButton.scss';

const LoginButton = ({ onClick }) => (
  <button
    type="button"
    className="login-button"
    onClick={onClick}
  >
    Войти
  </button>
);

LoginButton.propTypes = {
  onClick: PropTypes.func.isRequired
};

export default LoginButton;
