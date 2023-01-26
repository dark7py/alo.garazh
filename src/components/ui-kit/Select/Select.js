import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classname from 'classnames';
import { compose } from 'recompose';
import Dropdown from '../../Dropdown';

import './Select.scss';

class Select extends Component {
  arrowClasses = (isShowOptions) => classname({
    'ui-kit-select__arrow': true,
    'ui-kit-select__arrow--top': isShowOptions
  });

  itemsClasses = (id) => {
    const { value } = this.props;
    return classname({
      'ui-kit-select__item': true,
      'ui-kit-select__item--selected': value === id
    });
  };

  renderName = () => {
    const { value, options } = this.props;

    const currentOption = options.find(({ id }) => id === value);
    return currentOption && currentOption.name;
  };

  render() {
    const { options, onChange } = this.props;
    return (
      <div className="ui-kit-select">
        <Dropdown
          renderHandler={({ toggle, toggledOn }) => (
            <>
              <div
                className="ui-kit-select__label"
                onClick={toggle}
                role="presentation"
              >
                {this.renderName()}
              </div>
              <span
                className={this.arrowClasses(toggledOn)}
                onClick={toggle}
                role="presentation"
              />
            </>
          )}
          renderContent={({ hide }) => (
            <ul className="ui-kit-select__list">
              {options.map((option) => (
                <li
                  className={this.itemsClasses(option.id)}
                  onClick={compose(hide, onChange)}
                  key={option.id}
                  role="presentation"
                  id={option.id}
                >
                  {option.name}
                </li>
              ))}
            </ul>
          )}
        />
      </div>
    );
  }
}

Select.propTypes = {
  value: PropTypes.string,
  options: PropTypes.arrayOf(PropTypes.object),
  onChange: PropTypes.func.isRequired
};

Select.defaultProps = {
  value: [],
  options: []
};

export default Select;
