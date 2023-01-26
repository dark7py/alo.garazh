import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import { compose, branch, renderNothing } from 'recompose';

import { clickDropCallButton } from 'modules/ui/actions';
import { startCall, stopCall } from 'modules/call/actions';

import { isCallModalSelector } from 'modules/ui/selectors';
import { getUserPhone } from 'modules/user/selectors';

import {
  carIdSelector,
  callIdSelector,
  callStatusSelector,
  cancelIsPossibleSelector
} from 'modules/call/selectors';

import ModalCall from './ModalCall';

const mapStateToProps = createSelector(
  isCallModalSelector,
  callStatusSelector,
  carIdSelector,
  callIdSelector,
  cancelIsPossibleSelector,
  getUserPhone,
  (
    isOpen,
    status,
    carId,
    callId,
    cancelIsPossible,
    userPhone
  ) => ({
    isOpen,
    status,
    carId,
    callId,
    cancelIsPossible,
    userPhone
  })
);

const mapDispatchToProps = {
  startCall,
  stopCall,
  clickDropCallButton
};


const withBranch = branch(
  ({ isOpen }) => !isOpen, renderNothing
);

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const enhance = compose(
  withConnect,
  withBranch
);

export default enhance(ModalCall);
