import React from 'react';
import PropTypes from 'prop-types';

import './Icon.scss';

const Icon = ({ isActive }) => {
  const activeClasses = {
    icon: isActive ? 'call-modal-icon--active' : '',
    border: isActive ? 'call-modal-icon__border--active' : ''
  };

  const iconClassName = `call-modal-icon__icon ${activeClasses.icon}`;
  const borderClassName = `call-modal-icon__border ${activeClasses.border}`;

  return (
    <div className="call-modal-icon">
      <div className={borderClassName}>
        <div className={iconClassName} />
      </div>
    </div>
  );
};


Icon.propTypes = {
  isActive: PropTypes.bool
};

Icon.defaultProps = {
  isActive: true
};

export default Icon;
