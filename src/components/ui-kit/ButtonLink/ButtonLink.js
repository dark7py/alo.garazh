import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import classname from 'classnames';

import './ButtonLink.scss';

const ButtonLink = (props) => {
  const { href, theme, ...otherProps } = props;
  const className = classname(
    'ui-kit-button-link',
    `ui-kit-button-link--${theme}`
  );

  return (
    <Link
      to={href}
      className={className}
      /* eslint-disable-next-line react/jsx-props-no-spreading */
      {...otherProps}
    >
      {otherProps.children}
    </Link>
  );
};

ButtonLink.propTypes = {
  href: PropTypes.string.isRequired,
  theme: PropTypes.oneOf(['color', 'white'])
};

ButtonLink.defaultProps = {
  theme: 'color'
};

export default ButtonLink;
