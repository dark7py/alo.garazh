/* eslint-disable jsx-a11y/label-has-for */
import React from 'react';
import PropTypes from 'prop-types';
import './Input.scss';

const Input = (props) => {
  const {
    value,
    onChange,
    onFocus,
    placeholder
  } = props;

  return (
    <div className="ui-kit-input">
      <input
        type="text"
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        onFocus={onFocus}
      />
    </div>
  );
};

Input.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  onFocus: PropTypes.func,
  placeholder: PropTypes.string
};

Input.defaultProps = {
  placeholder: 'Введите текст',
  onFocus: () => {}
};

export default Input;
