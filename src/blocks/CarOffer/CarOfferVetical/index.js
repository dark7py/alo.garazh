import { createSelector } from 'reselect';
import { connect } from 'react-redux';

import { isMobileSelector } from 'modules/ui/selectors';
import { getCityName } from 'modules/data/selectors';

import CarOfferVertical from './CarOfferVertical';

const mapStateToProps = createSelector(
  isMobileSelector,
  getCityName,
  (isMobile, cityName) => ({ isMobile, cityName })
);

const mapDispatchToProps = null;

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default withConnect(CarOfferVertical);
