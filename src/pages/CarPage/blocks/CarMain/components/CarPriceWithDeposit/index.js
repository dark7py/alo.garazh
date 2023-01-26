import { createSelector } from 'reselect';
import { connect } from 'react-redux';
import { compose, branch, renderComponent } from 'recompose';

import { isMobileSelector } from '../../../../../../modules/ui/selectors';

import CarPriseWithDeposit from './CarPriseWithDeposit';
import CarPriseWithDepositMobile from './CarPriseWithDepositMobile';

const mapStateToProps = createSelector(
  isMobileSelector,
  (isMobile) => ({ isMobile })
);

const withConnect = connect(mapStateToProps);

const withBranch = branch(
  ({ isMobile }) => isMobile, renderComponent(CarPriseWithDepositMobile)
);

const enhance = compose(
  withConnect,
  withBranch
);

export default enhance(CarPriseWithDeposit);
