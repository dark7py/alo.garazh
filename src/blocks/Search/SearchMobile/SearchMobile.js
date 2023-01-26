import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';

import './SearchMobile.scss';

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
    width: '100%',
    borderRadius: 8,
    minHeight: 42,
    fontSize: 16,
    borderColor: '#cccccc',
    background: '#FFFFFF',
    boxShadow: null
  }),
  indicatorSeparator: () => null,
  dropdownIndicator: () => ({
    display: 'none'
  })
};

class SearchMobile extends PureComponent {
  onClear = () => {
    const { changeSearchString, save } = this.props;

    changeSearchString('');
    save();
  };

  render() {
    const { searchString } = this.props;

    return (
      <div className="search-mobile">
        <a href="#search">
          <Select
            instanceId="search-mobile"
            styles={reactSelectStyle}
            inputValue={searchString || ''}
            isClearable
            placeholder="Автомобиль, параметры..."
            noOptionsMessage={() => 'Не найдено'}
            menuIsOpen={false}
            isDisabled
          />
        </a>
        {
          searchString && (
            <button
              className="search-mobile__clear"
              type="button"
              onClick={this.onClear}
            />
          )
        }
        <div className="search-mobile__loupe" />
      </div>
    );
  }
}

SearchMobile.propTypes = {
  changeSearchString: PropTypes.func.isRequired,
  save: PropTypes.func.isRequired,
  searchString: PropTypes.string
};

SearchMobile.defaultProps = {
  searchString: ''
};

export default SearchMobile;
