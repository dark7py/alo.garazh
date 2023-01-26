import React from 'react';
import { createSelector } from 'reselect';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { compose, branch, renderNothing } from 'recompose';

import { isMobileSelector, getCityId } from 'modules/ui/selectors';
import { getUserType } from 'modules/user/selectors';

import CarNavigation from './CarNavigation';

const mapStateToProps = createSelector(
  isMobileSelector,
  getUserType,
  getCityId,
  (isMobile, userType, city) => ({ isMobile, userType, city })
);

const mapDispatchToProps = null;

const withConnect = connect(mapStateToProps, mapDispatchToProps);

// Если пользователь зашел с интерфеса таксопарка
// или модератора то скрываем кнопку
// Если таксопарк перешел с главной то показываем кнопку

const withBranch = branch(
  ({ userType, location }) => ['TAXIPARK', 'MODERATOR']
    .includes(userType) && !location.state, renderNothing
);

const enhance = compose(
  withRouter,
  withConnect,
  withBranch
);

export default enhance(React.memo(CarNavigation));
