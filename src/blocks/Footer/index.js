import { createSelector } from 'reselect';
import { connect } from 'react-redux';
import { compose, branch, renderNothing } from 'recompose';
import { matchPath } from 'react-router-dom';
import { withRouter } from 'react-router';

import { MAP_PATH } from 'routes';
import { getFooterZones, getCarBrands } from 'modules/data/selectors';
import { getCityId } from 'modules/ui/selectors';

import Footer from './Footer';

const mapStateToProps = createSelector(
  getFooterZones,
  getCarBrands,
  getCityId,
  (footerZones, carBrands, cityId) => ({ footerZones, carBrands, cityId })
);

const withBranch = branch(({ location }) => {
  const hideFooter = matchPath(location.pathname, {
    path: MAP_PATH,
    exact: true
  });

  return hideFooter;
}, renderNothing);

const withConnect = connect(mapStateToProps);

const enhance = compose(
  withRouter,
  withConnect,
  withBranch
);

export default enhance(Footer);
