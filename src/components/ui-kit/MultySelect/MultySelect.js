import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classname from 'classnames';
import Dropdown from '../../Dropdown';

import './MultySelect.scss';

class MultySelect extends Component {
  labelClasses = () => {
    const { value } = this.props;
    return classname({
      'ui-kit-multy-select__label': true,
      'ui-kit-multy-select__label--orange': value.length > 0
    });
  };

  arrowClasses = (isShowOptions) => classname({
    'ui-kit-multy-select__arrow': true,
    'ui-kit-multy-select__arrow--top': isShowOptions
  });

  itemsClasses = (id) => {
    const { value } = this.props;
    return classname({
      'ui-kit-multy-select__item': true,
      'ui-kit-multy-select__item--selected': value.indexOf(id) !== -1
    });
  };

  render() {
    const {
      value, options, onChange, children
    } = this.props;

    return (
      <div className="ui-kit-multy-select">
        <Dropdown
          renderHandler={({ toggle, toggledOn }) => (
            <>
              <div
                className={this.labelClasses()}
                onClick={toggle}
                role="presentation"
              >
                {`${children} ${value.length > 0 ? `(${value.length})` : ''}`}
              </div>
              <span
                className={this.arrowClasses(toggledOn)}
                onClick={toggle}
                role="presentation"
              />
            </>
          )}
          renderContent={() => (
            <ul className="ui-kit-multy-select__list">
              {options.map((option) => (
                <li
                  className={this.itemsClasses(option.value)}
                  onClick={() => onChange(option.value)}
                  key={option.value}
                  role="presentation"
                >
                  {option.label}
                </li>
              ))}
            </ul>
          )}
        />
      </div>
    );
  }
}

MultySelect.propTypes = {
  value: PropTypes.arrayOf(PropTypes.string),
  options: PropTypes.arrayOf(PropTypes.object),
  onChange: PropTypes.func.isRequired,
  children: PropTypes.node
};

MultySelect.defaultProps = {
  value: [],
  options: [],
  children: null
};

export default MultySelect;
