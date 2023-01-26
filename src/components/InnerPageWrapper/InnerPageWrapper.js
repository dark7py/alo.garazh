import React from 'react';
import PropTypes from 'prop-types';

import './InnerPageWrapper.scss';

import InnerMenu from './InnerMenu';

const InnerPageWrapper = ({ className, page, children }) => {
  const combinedClassName = `inner-wrapper ${className}`;

  return (
    <div className={combinedClassName}>
      <div className="inner-wrapper__menu">
        <InnerMenu active={page} />
      </div>
      <div className="inner-wrapper__content">
        {children}
      </div>
    </div>
  );
};

InnerPageWrapper.propTypes = {
  className: PropTypes.string,
  page: PropTypes.string,
  children: PropTypes.node.isRequired
};

InnerPageWrapper.defaultProps = {
  className: '',
  page: 'about'
};

export default InnerPageWrapper;
