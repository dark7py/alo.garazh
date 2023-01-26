import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import { compose, branch, renderNothing } from 'recompose';

import { closeDriverConditionModal } from 'modules/ui/actions';
import { startCall } from 'modules/call/actions';

import { isDriverConditionsModalSelector } from 'modules/ui/selectors';
import { carIdSelector } from 'modules/call/selectors';

import ModalDriverConditions from './ModalDriverConditions';

const mapStateToProps = createSelector(
  isDriverConditionsModalSelector,
  carIdSelector,
  (isOpen, carId) => ({
    isOpen,
    carId
  })
);

const mapDispatchToProps = {
  closeModal: closeDriverConditionModal,
  startCall
};

const withBranch = branch(({ isOpen }) => !isOpen, renderNothing);

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const enhance = compose(
  withConnect,
  withBranch
);

export default enhance(ModalDriverConditions);
