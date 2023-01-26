import { createSelector } from 'reselect';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { compose } from 'recompose';

import {
  mapCenterSelector,
  mapZoomSelector,
  getCityId
} from 'modules/ui/selectors';

import {
  setMapCenter,
  setMapZoom
} from 'modules/ui/actions';

import Map from './Map';

const mapStateToProps = createSelector(
  mapCenterSelector,
  mapZoomSelector,
  getCityId,
  (
    center,
    zoom,
    city
  ) => ({
    center,
    zoom,
    city
  })
);

const mapDispatchToProps = {
  setMapCenter,
  setMapZoom
};

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const enhance = compose(
  withRouter,
  withConnect
);

export default enhance(Map);
