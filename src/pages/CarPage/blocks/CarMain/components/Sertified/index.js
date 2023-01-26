import { createSelector } from 'reselect';
import { connect } from 'react-redux';
import { compose, branch, renderComponent } from 'recompose';

import Sertified from './Sertified';
import SertifiedMobile from './SertifiedMobile';

import { isMobileSelector } from '../../../../../../modules/ui/selectors';

const mapStateToProps = createSelector(
  isMobileSelector,
  (isMobile) => ({ isMobile })
);

const mapDispatchToProps = null;

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withBranch = branch(
  ({ isMobile }) => isMobile,
  renderComponent(SertifiedMobile)
);

const enhance = compose(
  withConnect,
  withBranch
);

export default enhance(Sertified);
