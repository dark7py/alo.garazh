import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';

import { fetchSearchSuggests } from '../api';
import { getSuggestsOptions } from '../utils';

import './SearchDesktop.scss';

const reactSelectStyle = {
  option: (provided, state) => ({
    ...provided,
    background: state.isFocused ? '#f4f4f4' : 'white',
    color: '#2d2d2d'
  }),
  control: (provide) => ({
    ...provide,
    width: '360px',
    borderRadius: 8,
    minHeight: 42,
    fontSize: 14,
    boxShadow: null,
    borderColor: '#cccccc',
    '&:hover': {
      borderColor: '#cccccc'
    }
  }),
  indicatorSeparator: () => null,
  dropdownIndicator: () => ({
    display: 'none'
  })
};


class SearchDesktop extends PureComponent {
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
    const { searchString } = this.props;
    this.setState({
      inputValue: searchString
    });
  }

  componentDidUpdate(prevProps) {
    const { searchString } = this.props;
    if (prevProps.searchString && !searchString) {
      this.onClear();
    }
  }

  onInputChange = (inputValue, { action }) => {
    if (action === 'input-change') {
      this.setState({
        inputValue
      });

      fetchSearchSuggests(inputValue)
        .then((res) => {
          this.setState({
            options: getSuggestsOptions(res, inputValue)
          });
        });
    }
  };

  onChange = (value, { action }) => {
    const { changeSearchString } = this.props;
    if (action === 'select-option') {
      this.setState({
        inputValue: value.label,
        menuIsOpen: false
      });

      changeSearchString(value.label);
      this.selectRef.current.blur();
    }
  };

  onFocus = (event) => {
    const { inputValue } = this.state;
    const { inputRef } = this.selectRef.current.select;

    fetchSearchSuggests(event.target.value)
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
    const { changeSearchString } = this.props;
    this.setState({
      inputValue: '',
      menuIsOpen: false
    });

    changeSearchString('');
  };

  onSearch = () => {
    const { inputValue } = this.state;
    const { changeSearchString } = this.props;

    changeSearchString(inputValue);
  };

  onKeyDown = (event) => {
    if (event.key === 'Enter') {
      const { inputValue } = this.state;
      const { changeSearchString } = this.props;
      this.setState({ inputValue });

      changeSearchString(inputValue);
    }

    return null;
  };

  render() {
    const { options, inputValue, menuIsOpen } = this.state;

    return (
      <div className="search-desktop">
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
          onKeyDown={this.onKeyDown}
          closeMenuOnSelect={false}
          isClearable={false}
          menuIsOpen={menuIsOpen}
          placeholder="Автомобиль, параметры..."
          noOptionsMessage={() => 'Не найдено'}
          ignoreAccents={false}
        />
        {
          inputValue && (
            <button
              className="search-desktop__clear"
              type="button"
              onClick={this.onClear}
            />
          )
        }
        <button
          className="search-desktop__loupe"
          type="button"
          onClick={this.onSearch}
        />
      </div>
    );
  }
}

SearchDesktop.propTypes = {
  changeSearchString: PropTypes.func.isRequired,
  searchString: PropTypes.string
};

SearchDesktop.defaultProps = {
  searchString: ''
};

export default SearchDesktop;
