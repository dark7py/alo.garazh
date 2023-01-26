import React from 'react';
import PropTypes from 'prop-types';

import ClickOutside from 'components/ClickOutside';

import './UserMenu.scss';

const UserMenu = ({ closeMenu, onExit, userType }) => (
  <ClickOutside onClickOutside={closeMenu}>
    <div className="user-menu">
      {
        userType === 'TAXIPARK' && (
          <a
            className="user-menu__button"
            href="/taxiparks/profile"
          >
            Профиль
          </a>
        )
      }
      <button
        className="user-menu__button"
        type="button"
        onClick={onExit}
      >
        Выход
      </button>
    </div>
  </ClickOutside>
);

UserMenu.propTypes = {
  closeMenu: PropTypes.func.isRequired,
  onExit: PropTypes.func.isRequired,
  userType: PropTypes.string.isRequired
};

export default UserMenu;
