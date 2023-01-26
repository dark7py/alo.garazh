/* eslint-disable jsx-a11y/label-has-for */
import React from 'react';
import PropTypes from 'prop-types';
import classname from 'classnames';
import './ButtonGroup.scss';

const ButtonGroup = (props) => {
  const {
    value,
    options,
    onChange
  } = props;
  const className = (id, index) => classname(
    'ui-kit-button-group__button',
    {
      'ui-kit-button-group__button--selected': value.indexOf(id) !== -1,
      'ui-kit-button-group__button--white-border':
          index < options.length - 1
          && value.indexOf(id) !== -1
          && value.indexOf(options[index + 1].id) !== -1,
      'ui-kit-button-group__button--orange-border':
          index < options.length - 1
          && value.indexOf(id) !== -1
          && value.indexOf(options[index + 1].id) === -1,
      'ui-kit-button-group__button--gray-border':
          index < options.length - 1
          && value.indexOf(options[index + 1].id) === -1
    }
  );

  return (
    <div className="ui-kit-button-group">
      {options.map((option, index) => (
        <button
          key={option.value}
          type="button"
          className={className(option.value, index)}
          id={option.value}
          onClick={() => onChange(option.value)}
        >
          <span>
            {option.label}
          </span>
        </button>
      ))}
    </div>
  );
};

ButtonGroup.propTypes = {
  value: PropTypes.arrayOf(PropTypes.string),
  options: PropTypes.arrayOf(PropTypes.object),
  onChange: PropTypes.func.isRequired
};

ButtonGroup.defaultProps = {
  value: [],
  options: []
};

export default ButtonGroup;
