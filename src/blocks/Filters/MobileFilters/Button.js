import React from 'react';
import PropTypes from 'prop-types';

const Button = (props) => {
  const { children } = props;

  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <div {...props} className="mobile-filters-button">
      {children}
    </div>
  );
};

Button.propTypes = {
  children: PropTypes.node
};

Button.defaultProps = {
  children: null
};

export default Button;
