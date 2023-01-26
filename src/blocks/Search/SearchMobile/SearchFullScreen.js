import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import Select from 'react-select';
import { historyType } from 'types';

import Button from 'components/ui-kit/Button';
import { fetchSearchSuggests } from '../api';
import { getSuggestsOptions } from '../utils';

const reactSelectStyle = {
  option: (provided, state) => ({
    ...provided,
    background: state.isSelected ? '#ffde40' : 'white',
    color: '#2d2d2d',
    '&:hover': {
      background: '#cccccc'
    }
  }),
  control: (provide) => ({
    ...provide,
    width: 'calc(100% - 100px)',
    borderRadius: 0,
    minHeight: 64,
    fontSize: 16,
    background: '#FFFFFF',
    boxShadow: null,
    border: 'none'
  }),
  indicatorSeparator: () => null,
  loadingIndicator: () => ({
    display: 'none'
  }),
  dropdownIndicator: () => ({
    display: 'none'
  })
};

class SearchFullScreen extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      inputValue: props.searchString || '',
      options: []
    };

    this.inputRef = React.createRef();
  }

  componentDidMount() {
    const { inputValue } = this.state;
    this.getSuggests(inputValue);

    this.inputRef.current.focus();
  }

  getSuggests = (inputValue) => {
    fetchSearchSuggests(inputValue)
      .then((res) => {
        this.setState({ options: getSuggestsOptions(res) });
      });
  };

  onInputChange = (inputValue, { action }) => {
    if (action === 'input-change') {
      this.setState({
        inputValue
      });
      this.getSuggests(inputValue);
    }
  };

  onOptionClick = (event) => {
    const { changeSearchString } = this.props;

    this.setState({
      inputValue: event.target.id
    });

    changeSearchString(event.target.id);
  };

  onClear = () => {
    const { changeSearchString, save } = this.props;

    this.setState({
      inputValue: ''
    });

    this.getSuggests('');
    changeSearchString('');
    save();
  };

  onClose = () => {
    const { history } = this.props;

    history.push({
      hash: null
    });
  };

  onSearch = () => {
    const { changeSearchString, save } = this.props;
    const { inputValue } = this.state;

    changeSearchString(inputValue);
    save();
    this.onClose();
  };

  render() {
    const { inputValue, options } = this.state;

    return (
      <div className="search-mobile-fullscreen">
        <div className="search-mobile-fullscreen__header">
          <Button theme="white" onClick={this.onClose}>
            Назад
          </Button>
        </div>
        <div className="search-mobile-fullscreen__container">
          <Select
            instanceId="search-mobile-full-screen"
            styles={reactSelectStyle}
            ref={this.inputRef}
            inputValue={inputValue}
            isClearable={false}
            cacheOptions
            options={options}
            onChange={this.onChange}
            onInputChange={this.onInputChange}
            placeholder="Автомобиль, параметры..."
            noOptionsMessage={() => 'Не найдено'}
            menuIsOpen={false}
          />
          {
            inputValue && (
              <button
                className="search-mobile-fullscreen__clear"
                type="button"
                onClick={this.onClear}
              />
            )
          }
          <div className="search-mobile-fullscreen__search">
            <Button onClick={this.onSearch}>
              Найти
            </Button>
          </div>
        </div>
        <div className="search-mobile-fullscreen_options">
          {
            options.map((option) => (
              <button
                className="search-mobile-fullscreen_option"
                key={option.value}
                id={option.value}
                onClick={this.onOptionClick}
                type="button"
              >
                {option.label}
              </button>
            ))
          }
        </div>
      </div>
    );
  }
}

SearchFullScreen.propTypes = {
  changeSearchString: PropTypes.func.isRequired,
  save: PropTypes.func.isRequired,
  searchString: PropTypes.string,
  history: PropTypes.shape(historyType).isRequired
};

SearchFullScreen.defaultProps = {
  searchString: ''
};

export default SearchFullScreen;
