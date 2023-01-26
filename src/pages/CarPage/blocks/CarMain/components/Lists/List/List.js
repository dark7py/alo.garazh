import React from 'react';
import PropTypes from 'prop-types';

import './List.scss';

const List = ({ children }) => (
  <ul className="car-main__features-list">
    {children}
  </ul>
);

List.propTypes = {
  children: PropTypes.node.isRequired
};

export default List;
