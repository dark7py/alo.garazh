import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { NavLink as Link } from 'react-router-dom';

const NavLink = (props) => {
  const {
    url,
    isLinkToMap,
    isMobile,
    className,
    activeClassName,
    isActive
  } = props;

  const type = useMemo(
    () => (isLinkToMap ? 'map' : 'list'),
    [isLinkToMap]
  );

  const icon = useMemo(
    () => `/images/icon-${type}.svg`,
    [type]
  );

  const label = useMemo(
    () => {
      if (isLinkToMap) {
        return 'Показать на карте';
      }
      return 'Показать списком';
    },
    [isLinkToMap]
  );

  return (
    <Link
      to={url}
      isActive={isActive}
      className={className}
      activeClassName={activeClassName}
    >
      {!isMobile && <span>{label}</span>}
      <img src={icon} alt={type} />
    </Link>
  );
};

NavLink.propTypes = {
  url: PropTypes.string.isRequired,
  isLinkToMap: PropTypes.bool,
  className: PropTypes.string,
  activeClassName: PropTypes.string,
  isActive: PropTypes.func,
  isMobile: PropTypes.bool
};

NavLink.defaultProps = {
  isLinkToMap: false,
  className: undefined,
  activeClassName: undefined,
  isActive: undefined,
  isMobile: false
};

export default NavLink;
