import React, { useState } from 'react';
import PropTypes from 'prop-types';

import ClickOutside from 'components/ClickOutside';
import SelectCity from '../SelectCity';

import Main from './Main';

import './CityModal.scss';

const CityModal = (props) => {
  const {
    closeModal,
    setCity,
    cityName
  } = props;

  const [isSelectCity, setIsSelectCity] = useState(false);
  return (
    <ClickOutside onClickOutside={closeModal}>
      <div className="city-modal">
        {
          isSelectCity ? (
            <SelectCity
              closeModal={closeModal}
              setCity={setCity}
            />
          ) : (
            <Main
              closeModal={closeModal}
              cityName={cityName}
              setIsSelectCity={setIsSelectCity}
            />
          )
        }
      </div>
    </ClickOutside>
  );
};

CityModal.propTypes = {
  closeModal: PropTypes.func.isRequired,
  setCity: PropTypes.func.isRequired,
  cityName: PropTypes.string.isRequired
};

export default CityModal;
