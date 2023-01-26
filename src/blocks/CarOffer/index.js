import { compose, branch, renderComponent } from 'recompose';
import { createSelector } from 'reselect';
import { connect } from 'react-redux';

import { isMobileSelector } from 'modules/ui/selectors';
import { getCityName } from 'modules/data/selectors';


import CarOfferHorizontal from './CarOfferHorizontal';
import CarOfferVertical from './CarOfferVetical';

const mapStateToProps = createSelector(
  isMobileSelector,
  getCityName,
  (isMobile, cityName) => ({ isMobile, cityName })
);

const mapDispatchToProps = null;

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withBranch = branch(
  ({ isMobile }) => isMobile, renderComponent(CarOfferVertical)
);

const enhance = compose(
  withConnect,
  withBranch
);

export default enhance(CarOfferHorizontal);

export { CarOfferHorizontal, CarOfferVertical };
