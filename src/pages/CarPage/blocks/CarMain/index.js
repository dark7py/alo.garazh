import { createSelector } from 'reselect';
import { connect } from 'react-redux';
import { compose, branch, renderComponent } from 'recompose';

import { isMobileSelector } from 'modules/ui/selectors';
import { getDirectories, getCityName } from 'modules/data/selectors';
import { errorPageSelector } from 'modules/errors/selectors';

import CarMain from './CarMain';
import CarMainMobile from './CarMainMobile';

const mapStateToProps = createSelector(
  isMobileSelector,
  getDirectories,
  errorPageSelector,
  getCityName,
  (isMobile, directories, error, cityName) => ({
    isMobile,
    directories,
    error,
    cityName
  })
);

const withConnect = connect(mapStateToProps);

const withBranch = branch(
  ({ isMobile }) => isMobile, renderComponent(CarMainMobile)
);

const enhance = compose(
  withConnect,
  withBranch
);

export default enhance(CarMain);
