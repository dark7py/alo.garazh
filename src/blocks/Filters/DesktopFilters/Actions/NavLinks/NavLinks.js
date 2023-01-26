import React from 'react';

import NavLink from 'blocks/Filters/NavLink';

import './NavLinks.scss';

const NavLinks = () => (
  <>
    <NavLink
      className="desktop-filters__nav-link"
      activeClassName="desktop-filters__nav-link_active"
    />
    <NavLink
      isLinkToMap
      className="desktop-filters__nav-link"
      activeClassName="desktop-filters__nav-link_active"
    />
  </>
);

export default NavLinks;
