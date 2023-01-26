import { connect } from 'react-redux';
import { compose, branch, renderNothing } from 'recompose';
import { createSelector } from 'reselect';

import {
  isMobileSelector
} from 'modules/ui/selectors';

import { getCityName } from 'modules/data/selectors';

import CityButton from './CityButton';

const mapStateToProps = createSelector(
  getCityName,
  isMobileSelector,
  (cityName, isMobile) => ({ cityName, isMobile })
);

const mapDispatchToProps = null;

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withBranch = branch(
  ({ isMobile }) => isMobile, renderNothing
);

const enhance = compose(
  withConnect,
  withBranch
);


export default enhance(CityButton);
