import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import Modal from 'components/Modal';
import Input from 'components/ui-kit/Input';

import { locationType, historyType } from 'types';

import './ModalCitySelect.scss';
import { getCitiesOptions } from './utils';

class ModalCitySelect extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      cityText: props.cityName,
      isChanged: false
    };
  }

  // TODO: refactoring
  cityList = () => {
    const { cityText, isChanged } = this.state;
    const { zones, zonesSelection } = this.props;

    if (zones) {
      return cityText === '' || !isChanged
        ? getCitiesOptions(zones, zonesSelection)
        : getCitiesOptions(zones, zonesSelection)
          .filter((el) => el.label.toLowerCase().includes(cityText.toLowerCase()));
    }

    return [];
  };

  changeCity = (e) => {
    this.setState({ cityText: e.target.value });
  };

  clearCityText = () => {
    this.setState({ cityText: '', isChanged: true });
  };

  onSave = (e) => {
    const {
      setCity,
      closeCityModal,
      history,
      location
    } = this.props;

    if (e.target.id) {
      setCity(e.target.id);
    }

    if (location.pathname !== '/map') {
      history.push(`/${e.target.id}`);
    }

    closeCityModal();
  };

  render() {
    const { cityText } = this.state;
    const { closeCityModal } = this.props;

    return (
      <Modal closeModal={closeCityModal}>
        <div className="modal-city-selest">
          <h4 className="modal-city-selest__title">Укажите город</h4>
          <Input
            value={cityText}
            onChange={this.changeCity}
            onFocus={this.clearCityText}
            placeholder="Введите город"
          />
          <ul className="modal-city-selest__list">
            {this.cityList().map((el) => (
              <li
                key={el.value}
                id={el.value}
                className="modal-city-selest__item"
                onClick={this.onSave}
                role="presentation"
              >
                {el.label}
              </li>
            ))}
          </ul>
        </div>
      </Modal>
    );
  }
}

ModalCitySelect.propTypes = {
  zones: PropTypes.arrayOf(PropTypes.object).isRequired,
  zonesSelection: PropTypes.arrayOf(PropTypes.string).isRequired,
  cityName: PropTypes.string.isRequired,
  setCity: PropTypes.func.isRequired,
  closeCityModal: PropTypes.func.isRequired,
  history: PropTypes.shape(historyType).isRequired,
  location: PropTypes.shape(locationType).isRequired
};

export default ModalCitySelect;
