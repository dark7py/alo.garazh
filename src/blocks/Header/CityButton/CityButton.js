import React, { useState } from 'react';
import PropTypes from 'prop-types';

import './CityButton.scss';

import CityModal from '../CityModal';

const CityButton = ({ cityName }) => {
  const [isModal, setIsModal] = useState(false);
  if (!cityName) {
    return null;
  }

  const openModal = () => setIsModal(true);
  const closeModal = () => setIsModal(false);

  return (
    <div className="city-button__container">
      <button
        type="button"
        className="city-button"
        onClick={openModal}
      >
        {cityName}
      </button>
      {isModal && <CityModal closeModal={closeModal} />}
    </div>
  );
};

CityButton.propTypes = {
  cityName: PropTypes.string.isRequired
};

export default CityButton;
