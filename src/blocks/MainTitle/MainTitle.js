import React from 'react';
import PropTypes from 'prop-types';
import { cityIn } from 'lvovich';

import { getTitle } from './utils';

import './MainTitle.scss';

const MainTitle = (props) => {
  const {
    isMobile,
    cityName,
    brandName,
    modelName,
    park,
    openCityModal
  } = props;

  const renderMobile = () => (
    <h1>
      <span>{getTitle(null, brandName, modelName, park)}</span>
      <div>
        <button
          type="button"
          className="main-title__city-button"
          onClick={openCityModal}
        >
          {`в ${cityIn(cityName)}`}
        </button>
      </div>
    </h1>
  );

  return (
    <div className="main-title">
      {
        isMobile
          ? renderMobile()
          : <h1>{getTitle(cityName, brandName, modelName, park)}</h1>
      }
    </div>
  );
};

MainTitle.propTypes = {
  isMobile: PropTypes.bool.isRequired,
  cityName: PropTypes.string.isRequired,
  brandName: PropTypes.string,
  modelName: PropTypes.string,
  openCityModal: PropTypes.func.isRequired,
  park: PropTypes.string
};

MainTitle.defaultProps = {
  brandName: null,
  modelName: null,
  park: ''
};

export default MainTitle;
