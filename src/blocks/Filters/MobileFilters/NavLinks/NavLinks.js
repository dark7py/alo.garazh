import React from 'react';

import NavLink from 'blocks/Filters/NavLink';

import './NavLinks.scss';

const NavLinks = () => (
  <div className="mobile-filters__nav-link-container">
    <NavLink
      isMobile
      className="mobile-filters__nav-link"
      activeClassName="mobile-filters__nav-link_active"
    />
    <NavLink
      isMobile
      isLinkToMap
      className="mobile-filters__nav-link"
      activeClassName="mobile-filters__nav-link_active"
    />
  </div>
);

export default NavLinks;
