import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';

import { fetchParkSuggests } from './api';
import { getSuggestsOptions } from './utils';

import './ParkSelector.scss';

const reactSelectStyle = {
  option: (provided, state) => ({
    ...provided,
    background: state.isFocused ? '#f4f4f4' : 'white',
    color: '#2d2d2d'
  }),
  control: (provide) => ({
    ...provide,
    borderRadius: 8,
    minHeight: 42,
    fontSize: 14,
    boxShadow: null,
    borderColor: '#cccccc',
    '&:hover': {
      borderColor: '#cccccc'
    }
  }),
  input: (provide) => ({
    ...provide,
    marginRight: 67,
    textOverflow: 'ellipsis',
    overflow: 'hidden'
  }),
  indicatorSeparator: () => null,
  dropdownIndicator: () => ({
    display: 'none'
  })
};

class ParkSelector extends PureComponent {
  selectRef = React.createRef();

  constructor(props) {
    super(props);

    this.state = {
      inputValue: '',
      options: [],
      menuIsOpen: false
    };
  }

  componentDidMount() {
    const { park } = this.props;
    this.setState({
      inputValue: park ? park.name : ''
    });
  }

  componentDidUpdate(prevProps) {
    const { park } = this.props;
    if (prevProps.park && !park) {
      this.onClear();
    }
  }

  onInputChange = (inputValue, { action }) => {
    const { zone } = this.props;

    if (action === 'input-change') {
      this.setState({
        inputValue
      });

      if (inputValue && inputValue.length >= 2) {
        fetchParkSuggests(inputValue, zone)
          .then((res) => {
            this.setState({
              options: getSuggestsOptions(res),
              menuIsOpen: true
            });
          });
      } else {
        this.setState({
          options: []
        });
      }
    }
  };

  onChange = (value, { action }) => {
    const { changePark } = this.props;
    if (action === 'select-option') {
      this.setState({
        inputValue: value.label,
        menuIsOpen: false
      });

      changePark(value);
      this.selectRef.current.blur();
    }
  };

  onFocus = (event) => {
    const { inputValue } = this.state;
    const { zone } = this.props;
    const { inputRef } = this.selectRef.current.select;

    if (!event.target.value && event.target.value.length < 2) {
      return;
    }

    fetchParkSuggests(event.target.value, zone)
      .then((res) => {
        this.setState({
          options: getSuggestsOptions(res),
          menuIsOpen: true
        });
      });

    // Двигаем каретку в конец строки
    inputRef.selectionStart = inputValue.length;
  };

  onBlur = () => {
    this.setState({
      menuIsOpen: false
    });
  };

  onClear = () => {
    const { changePark } = this.props;
    this.setState({
      inputValue: '',
      menuIsOpen: false
    });

    changePark(null);
  };

  render() {
    const { options, inputValue, menuIsOpen } = this.state;

    return (
      <div className="park-selector">
        <Select
          instanceId="search"
          ref={this.selectRef}
          inputValue={inputValue}
          value={null}
          styles={reactSelectStyle}
          cacheOptions
          options={options}
          onInputChange={this.onInputChange}
          onChange={this.onChange}
          onFocus={this.onFocus}
          onBlur={this.onBlur}
          closeMenuOnSelect={false}
          isClearable={false}
          menuIsOpen={menuIsOpen}
          placeholder="Парк"
          noOptionsMessage={() => 'Не найдено'}
          ignoreAccents={false}
        />
        {
          inputValue && (
            <button
              className="park-selector__clear"
              type="button"
              onClick={this.onClear}
            />
          )
        }
        <button
          className="park-selector__loupe"
          type="button"
          onClick={() => {}}
        />
      </div>
    );
  }
}

ParkSelector.propTypes = {
  changePark: PropTypes.func.isRequired,
  park: PropTypes.shape({
    name: PropTypes.string,
    slug: PropTypes.string
  }),
  zone: PropTypes.string.isRequired
};

ParkSelector.defaultProps = {
  park: null
};

export default ParkSelector;
