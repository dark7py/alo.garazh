import { connect } from 'react-redux';
import { createSelector } from 'reselect';

import { getUserInfo, logout } from 'modules/user/actions';
import {
  isAuthorizedSelector,
  getUserName,
  getUserType,
  getUserPhone
} from 'modules/user/selectors';

import { openLoginModal } from 'modules/ui/actions';

import User from './User';

const mapStateToProps = createSelector(
  isAuthorizedSelector,
  getUserName,
  getUserPhone,
  getUserType,
  (isAuthorized, userName, userPhone, userType) => ({
    isAuthorized,
    userName,
    userPhone,
    userType
  })
);

const mapDispatchToProps = {
  getUserInfo,
  logout,
  openLoginModal
};

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default withConnect(User);
