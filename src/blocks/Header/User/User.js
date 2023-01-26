import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import LoginButton from './LoginButton';
import UserMenu from './UserMenu';

import './User.scss';

class User extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      isMenu: false
    };
  }

  openUserMenu = () => {
    this.setState({ isMenu: true });
  };

  closeUserMenu = () => {
    this.setState({ isMenu: false });
  };

  onExit = () => {
    const { logout } = this.props;
    this.setState({ isMenu: false });
    logout();
  };

  render() {
    const {
      userName,
      userPhone,
      userType,
      isAuthorized,
      openLoginModal
    } = this.props;

    const { isMenu } = this.state;

    if (!isAuthorized) {
      return <LoginButton onClick={openLoginModal} />;
    }

    return (
      <div className="user">
        <button
          className="user__button"
          type="button"
          onClick={this.openUserMenu}
        >
          <div className="user__name">
            {userName || userPhone}
          </div>
          <img
            className="user__avatar"
            alt="user avatar"
            src="/images/userAvatar.svg"
          />
        </button>
        {isMenu && (
          <UserMenu
            onExit={this.onExit}
            closeMenu={this.closeUserMenu}
            userType={userType}
          />
        )}
      </div>
    );
  }
}

User.propTypes = {
  logout: PropTypes.func.isRequired,
  userName: PropTypes.string,
  userPhone: PropTypes.string,
  userType: PropTypes.string,
  isAuthorized: PropTypes.bool.isRequired,
  openLoginModal: PropTypes.func.isRequired
};

User.defaultProps = {
  userName: '---',
  userPhone: '---',
  userType: ''
};

export default User;
