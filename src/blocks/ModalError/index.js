import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import { compose, branch, renderNothing } from 'recompose';
import { withRouter } from 'react-router-dom';

import { errorModalSelector } from 'modules/errors/selectors';

import ModalError from './ModalError';

const mapStateToProps = createSelector(
  errorModalSelector,
  (errorModal) => ({
    errorModal
  })
);

const mapDispatchToProps = null;

const withBranch = branch(({ errorModal }) => !errorModal, renderNothing);

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const enhance = compose(
  withConnect,
  withBranch,
  withRouter
);

export default enhance(ModalError);
