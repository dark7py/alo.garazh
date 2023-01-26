import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import './CustomButtons.scss';

const CustomButtons = ({ onChangeZoom, getPosition, isPanelOpen }) => {
  const buttonsClass = classnames({
    map__buttons: true,
    'map__buttons--left': isPanelOpen
  });

  return (
    <div className={buttonsClass}>
      <button
        id="plus"
        className="map__button map__button--plus"
        onClick={onChangeZoom}
        type="button"
      />
      <button
        id="minus"
        className="map__button map__button--minus"
        onClick={onChangeZoom}
        type="button"
      />
      <button
        className="map__button map__button--geo"
        onClick={getPosition}
        type="button"
      />
    </div>
  );
};

CustomButtons.propTypes = {
  onChangeZoom: PropTypes.func.isRequired,
  getPosition: PropTypes.func.isRequired,
  isPanelOpen: PropTypes.bool.isRequired
};

export default CustomButtons;
