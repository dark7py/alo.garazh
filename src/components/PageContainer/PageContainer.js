import React from 'react';
import PropTypes from 'prop-types';

import './PageContainer.scss';

const PageContainer = ({ className, children }) => {
  const combinedClassName = `page-container ${className}`;

  return (
    <div className={combinedClassName}>
      {children}
    </div>
  );
};

PageContainer.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node
};

PageContainer.defaultProps = {
  className: '',
  children: null
};

export default PageContainer;
