/* eslint-disable jsx-a11y/label-has-for */
import React from 'react';
import PropTypes from 'prop-types';
import './Textarea.scss';

const Textarea = (props) => {
  const {
    value,
    onChange,
    placeholder
  } = props;

  return (
    <div className="ui-kit-textarea">
      <textarea
        value={value}
        placeholder={placeholder}
        onChange={onChange}
      />
    </div>
  );
};

Textarea.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string
};

Textarea.defaultProps = {
  placeholder: 'Введите текст'
};

export default Textarea;
