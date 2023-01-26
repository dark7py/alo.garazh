import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import { compose, branch, renderNothing } from 'recompose';
import loadable from '@loadable/component';

import { closeFeedbackModal } from 'modules/ui/actions';
import { sendFeedback } from 'modules/call/actions';

import { isFeedbackModalSelector } from 'modules/ui/selectors';

import {
  callIdSelector,
  callSessionIdSelector,
  feedbackSuccessSelector
} from 'modules/call/selectors';

const ModalFeedback = loadable(
  () => import(
    /* webpackPrefetch: true */
    './ModalFeedback'
  )
);

const mapStateToProps = createSelector(
  isFeedbackModalSelector,
  feedbackSuccessSelector,
  callIdSelector,
  callSessionIdSelector,
  (isOpen, feedbackSuccess, callId, sessionId) => ({
    isOpen,
    feedbackSuccess,
    callId,
    sessionId
  })
);

const mapDispatchToProps = {
  closeModal: closeFeedbackModal,
  sendFeedback
};

const withBranch = branch(({ isOpen }) => !isOpen, renderNothing);

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const enhance = compose(
  withConnect,
  withBranch
);

export default enhance(ModalFeedback);
