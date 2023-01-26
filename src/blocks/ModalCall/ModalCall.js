/* eslint-disable camelcase */
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import ButtonCall from './ButtonCall';
import Info from './Info';
import Icon from './Icon';

import './ModalCall.scss';

class ModalCall extends PureComponent {
  close = () => {
    const { clickDropCallButton, stopCall } = this.props;

    clickDropCallButton();
    stopCall();
  };

  reCall = () => {
    const { carId, startCall } = this.props;

    startCall(carId);
  };

  // status
  render() {
    const { status, cancelIsPossible, userPhone } = this.props;
    const isActive = status !== 'failed';


    const activeClassName = isActive ? 'call-modal--active' : '';
    const modalClassName = `call-modal ${activeClassName}`;

    return (
      <div className={modalClassName}>
        <div className="call-modal__content">
          <div className="call-modal__info-container">
            <Icon isActive={isActive} />
            <Info
              isActive={isActive}
              userPhone={userPhone}
            />
          </div>
          {(cancelIsPossible || !isActive) && (
            <ButtonCall
              isActive={isActive}
              close={this.close}
              reCall={this.reCall}
            />
          )}
        </div>
        <button
          type="button"
          className="modal__close call-modal__close"
          onClick={this.close}
        />
      </div>
    );
  }
}

ModalCall.propTypes = {
  clickDropCallButton: PropTypes.func.isRequired,
  carId: PropTypes.number.isRequired,
  stopCall: PropTypes.func.isRequired,
  startCall: PropTypes.func.isRequired,
  cancelIsPossible: PropTypes.bool,
  status: PropTypes.string,
  userPhone: PropTypes.string
};

ModalCall.defaultProps = {
  cancelIsPossible: false,
  status: null,
  userPhone: PropTypes
};

export default ModalCall;
