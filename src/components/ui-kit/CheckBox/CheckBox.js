/* eslint-disable jsx-a11y/label-has-for */
import React from 'react';
import PropTypes from 'prop-types';
import './CheckBox.scss';

const checkMarkOff = '/images/new-checkbox-off.svg';
const checkMarkOn = '/images/new-checkbox-on.svg';

const CheckBox = (props) => {
  const {
    id,
    isChecked,
    onChange,
    children
  } = props;

  const checkMark = isChecked ? checkMarkOn : checkMarkOff;
  const labelStyle = { backgroundImage: `url(${checkMark})` };

  return (
    <div className="ui-kit-checkbox">
      <input
        id={id}
        type="checkbox"
        checked={!!isChecked}
        onChange={onChange}
      />
      <label htmlFor={id} style={labelStyle}>
        {children}
      </label>
    </div>
  );
};

CheckBox.propTypes = {
  id: PropTypes.string.isRequired,
  isChecked: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  onChange: PropTypes.func.isRequired,
  children: PropTypes.node
};

CheckBox.defaultProps = {
  isChecked: false,
  children: null
};

export default CheckBox;
