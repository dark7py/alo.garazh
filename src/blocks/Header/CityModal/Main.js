import React from 'react';
import PropTypes from 'prop-types';

import Button from 'components/ui-kit/Button';

const Main = ({ closeModal, setIsSelectCity, cityName }) => {
  const onClickNo = () => {
    setIsSelectCity(true);
  };

  return (
    <>
      <div className="city-modal__small-text">
        Ваш город
      </div>
      <div className="city-modal__text">
        { cityName }
      </div>
      <div className="city-modal__buttons-container">
        <Button
          onClick={closeModal}
          theme="color"
        >
          Да, спасибо
        </Button>
        <Button
          onClick={onClickNo}
          theme="white"
        >
          Нет, другой
        </Button>
      </div>
    </>
  );
};

Main.propTypes = {
  closeModal: PropTypes.func.isRequired,
  setIsSelectCity: PropTypes.func.isRequired,
  cityName: PropTypes.string.isRequired
};

export default Main;
