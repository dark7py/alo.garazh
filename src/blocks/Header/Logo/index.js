import { connect } from 'react-redux';
import { createSelector } from 'reselect';

import { getCityId } from 'modules/ui/selectors';

import Logo from './Logo';

const mapStateToProps = createSelector(
  getCityId,
  (city) => ({
    city
  })
);

const mapDispatchToProps = null;

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default withConnect(Logo);
