import React from 'react';
import PropTypes from 'prop-types';

import './Item.scss';

function Item({ alignChild, children }) {
  const align = {
    top: 'car-main__feature-element_top'
  };

  const className = `car-main__feature-element ${align[alignChild] || ''}`;

  return (
    <li className={className}>
      {children}
    </li>
  );
}

Item.propTypes = {
  alignChild: PropTypes.oneOf(['top', '']),
  children: PropTypes.node.isRequired
};

Item.defaultProps = {
  alignChild: ''
};

export default Item;
