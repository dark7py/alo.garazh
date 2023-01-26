import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import { compose, branch, renderNothing } from 'recompose';


import { closeDontAcceptCallsModal } from 'modules/ui/actions';
import { companyNotWorkSelector } from 'modules/call/selectors';
import { isDontAcceptCallsModalSelector } from 'modules/ui/selectors';

import ModalDontAcceptCalls from './ModalDontAcceptCalls';

const mapStateToProps = createSelector(
  isDontAcceptCallsModalSelector,
  companyNotWorkSelector,
  (
    isDontAcceptCallsModal,
    companyNotWork
  ) => ({
    isDontAcceptCallsModal,
    companyNotWork
  })
);

const mapDispatchToProps = {
  closeDontAcceptCallsModal
};

const withBranch = branch(({ isDontAcceptCallsModal }) => !isDontAcceptCallsModal, renderNothing);

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const enhance = compose(
  withConnect,
  withBranch
);

export default enhance(ModalDontAcceptCalls);
