import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';
import { historyType } from 'types';

import Button from 'components/ui-kit/Button';
import { getBrandModelPrefix } from 'utils';

const SelectCity = (props) => {
  const {
    closeModal,
    setCity,
    history,
    modelName,
    brandName,
    citiesOptions
  } = props;

  const { location } = history;

  const [value, setValue] = useState(null);

  const onChange = (e) => {
    setValue(e.value);
  };

  const onSave = () => {
    if (value) {
      setCity(value);
    }

    if (location.pathname !== '/map') {
      const prefix = getBrandModelPrefix(brandName, modelName);
      history.push({
        pathname: `/${value}${prefix}`,
        search: location.search
      });
    }

    closeModal();
  };

  return (
    <>
      <div className="city-modal__select-container">
        <Select
          placeholder="Укажите другой город"
          options={citiesOptions}
          defaultValue={value}
          onChange={onChange}
          noOptionsMessage={() => 'Не найдено'}
        />
      </div>
      <Button theme="white" onClick={onSave}>
        Сохранить
      </Button>
    </>
  );
};

SelectCity.propTypes = {
  closeModal: PropTypes.func.isRequired,
  setCity: PropTypes.func.isRequired,
  history: PropTypes.shape(historyType).isRequired,
  modelName: PropTypes.string,
  brandName: PropTypes.string,
  citiesOptions: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired
  })).isRequired
};

SelectCity.defaultProps = {
  modelName: null,
  brandName: null
};

export default SelectCity;
