import React from 'react';
import PropTypes from 'prop-types';

import Button from 'components/ui-kit/Button';

const ButtonCall = ({ isActive, close, reCall }) => (
  <div className="call-modal__button-container">
    <Button
      theme="white"
      onClick={isActive ? close : reCall}
    >
      {isActive ? 'Сбросить' : 'Перезвонить мне'}
    </Button>
  </div>
);

ButtonCall.propTypes = {
  isActive: PropTypes.bool,
  close: PropTypes.func.isRequired,
  reCall: PropTypes.func.isRequired
};

ButtonCall.defaultProps = {
  isActive: true
};

export default ButtonCall;
