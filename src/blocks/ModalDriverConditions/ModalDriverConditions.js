import React from 'react';
import PropType from 'prop-types';

import Modal from 'components/Modal';
import Button from 'components/ui-kit/Button';

import './ModalDriverConditions.scss';

const ModalDriverConditions = ({ closeModal, startCall, carId }) => {
  const onClick = () => {
    localStorage.setItem('driver-conditions-was-shown', 'true');
    closeModal();
    startCall(carId);
  };

  return (
    <Modal closeModal={closeModal}>
      <div className="call-start">
        <div className="call-start__icon">!</div>
        <h3 className="call-start__title">
          Чтобы работать в такси небходимо:
        </h3>
        <ul className="call-start__list">
          <li>иметь стаж водителя от 3 лет</li>
          <li>быть гражданином РФ</li>
        </ul>
        <Button
          theme="color"
          onClick={onClick}
        >
          Продолжить
        </Button>
      </div>
    </Modal>
  );
};

ModalDriverConditions.propTypes = {
  startCall: PropType.func.isRequired,
  closeModal: PropType.func.isRequired,
  carId: PropType.number.isRequired
};

export default ModalDriverConditions;
