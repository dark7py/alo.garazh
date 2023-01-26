import { createSelector } from 'reselect';
import { connect } from 'react-redux';
import { compose, lifecycle } from 'recompose';
import { withRouter } from 'react-router';

import { getOffersPoints } from 'modules/data/selectors';
import {
  getCityId,
  selectedOffersPointsIdsSelector
} from 'modules/ui/selectors';

import { getOffersPoints as getOffersPointsAction } from 'modules/data/actions';
import {
  addSelectedOffersPoints,
  cleanSelectedOffersPoints
} from 'modules/ui/actions';

import MapPage from './MapPage';

const withLifecycle = lifecycle({
  componentDidMount() {
    const { requestOffersPoints } = this.props;

    requestOffersPoints();
  },
  componentDidUpdate(prevProps) {
    const {
      city,
      requestOffersPoints
    } = this.props;

    if (prevProps.city !== city) {
      requestOffersPoints();
    }
  }
});

const mapStateToProps = createSelector(
  getOffersPoints,
  selectedOffersPointsIdsSelector,
  getCityId,
  (
    offersPoints,
    selectedOffersIds,
    city
  ) => ({
    offersPoints,
    selectedOffersIds,
    city
  })
);

const mapDispatchToProps = {
  requestOffersPoints: getOffersPointsAction,
  addSelectedOffersPoints,
  cleanSelectedOffersPoints
};

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const enhance = compose(
  withRouter,
  withConnect,
  withLifecycle
);

export default enhance(MapPage);
