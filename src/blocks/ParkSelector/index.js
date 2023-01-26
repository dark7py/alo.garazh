import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import { compose } from 'recompose';
import { withRouter } from 'react-router-dom';

import { getPark } from 'modules/data/selectors';
import { getCityId } from 'modules/ui/selectors';
import { changePark } from 'modules/filters/actions';

import ParkSelector from './ParkSelector';

const mapStateToProps = createSelector(
  getPark,
  getCityId,
  (park, zone) => ({
    park,
    zone
  })
);

const mapDispatchToProps = {
  changePark
};

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const enhance = compose(
  withConnect,
  withRouter
);

export default enhance(ParkSelector);
