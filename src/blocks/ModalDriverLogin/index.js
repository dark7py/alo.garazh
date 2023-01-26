import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import { compose, branch, renderNothing } from 'recompose';

import {
  getLoginSms,
  login,
  reset,
  resetError
} from 'modules/user/actions';

import { closeLoginModal } from 'modules/ui/actions';

import {
  isLoginModalSelector,
  getCityId
} from 'modules/ui/selectors';

import {
  isProcessingSelector,
  isSmsRequestedSelector,
  userErrorSelector
} from 'modules/user/selectors';

import {
  getSmsCodeLength
} from 'modules/data/selectors';

import ModalDriverLogin from './ModalDriverLogin';

const mapStateToProps = createSelector(
  isProcessingSelector,
  isLoginModalSelector,
  isSmsRequestedSelector,
  userErrorSelector,
  getCityId,
  getSmsCodeLength,
  (
    isProcessing,
    isOpen,
    isSmsRequested,
    error,
    city,
    smsCodeLength
  ) => ({
    isProcessing,
    isOpen,
    isSmsRequested,
    error,
    city,
    smsCodeLength
  })
);

const mapDispatchToProps = {
  login,
  reset,
  resetError,
  getLoginSms,
  closeLoginModal
};

const withBranch = branch(({ isOpen }) => !isOpen, renderNothing);

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const enhance = compose(
  withConnect,
  withBranch
);

export default enhance(ModalDriverLogin);
