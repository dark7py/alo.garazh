import React from 'react';
import PropTypes from 'prop-types';
import InputMask from 'react-input-mask';
import './Input.scss';

const InputPhone = (props) => {
  const {
    value,
    onChange
  } = props;

  return (
    <div className="ui-kit-input">
      <InputMask mask="+7(999)999-99-99" value={value} onChange={onChange} />
    </div>
  );
};

InputPhone.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired
};

export default InputPhone;
