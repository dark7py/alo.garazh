import React from 'react';
import PropTypes from 'prop-types';
import classname from 'classnames';

import './Button.scss';

const Button = (props) => {
  const {
    type, theme, iconUrl, disabled, className, ...otherProps
  } = props;

  const classNames = classname(
    'ui-kit-button',
    `ui-kit-button--${theme}`,
    {
      'ui-kit-button--disabled': disabled,
      'ui-kit-button--icon': iconUrl
    },
    className
  );

  return (
    // eslint-disable-next-line react/button-has-type
    <button
      disabled={disabled}
      type={type}
      className={classNames}
      style={iconUrl && { backgroundImage: `url(${iconUrl})` }}
      /* eslint-disable-next-line react/jsx-props-no-spreading */
      {...otherProps}
    >
      {otherProps.children}
    </button>
  );
};

Button.propTypes = {
  theme: PropTypes.oneOf(['color', 'white', 'gray']),
  iconUrl: PropTypes.string,
  disabled: PropTypes.bool,
  type: PropTypes.string,
  className: PropTypes.string
};

Button.defaultProps = {
  theme: 'color',
  iconUrl: null,
  disabled: false,
  type: 'button',
  className: null
};

export default Button;
