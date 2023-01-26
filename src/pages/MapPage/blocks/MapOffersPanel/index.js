import { branch, compose, renderNothing } from 'recompose';
import { createSelector } from 'reselect';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import { selectedOffersPointsIdsSelector } from 'modules/ui/selectors';
import { cleanSelectedOffersPoints } from 'modules/ui/actions';

import MapOffersPanel from './MapOffersPanel';

const mapStateToProps = createSelector(
  selectedOffersPointsIdsSelector,
  (selectedOffersPointsIds) => ({ selectedOffersPointsIds })
);

const mapDispatchToProps = {
  cleanSelectedOffersPoints
};

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withBranch = branch(
  ({ history, selectedOffersPointsIds }) => history.location.hash !== '#offers'
      || !selectedOffersPointsIds.length,
  renderNothing
);

const enhance = compose(
  withRouter,
  withConnect,
  withBranch
);

export default enhance(MapOffersPanel);
