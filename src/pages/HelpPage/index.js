import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import { lifecycle, compose } from 'recompose';

import {
  isMobileSelector,
  getCityId,
  feedbackSuccessSelector
} from 'modules/ui/selectors';

import { getUserInfo } from 'modules/user/selectors';

import HelpPage from './HelpPage';

const mapStateToProps = createSelector(
  isMobileSelector,
  getCityId,
  getUserInfo,
  feedbackSuccessSelector,
  (isMobile, city, userInfo, feedbackSuccess) => ({
    isMobile, city, userInfo, feedbackSuccess
  })
);

const withConnect = connect(mapStateToProps, null);

const withLifecycle = lifecycle({
  componentDidMount() {
    // Сколим страницу на верх
    window.scrollTo({ top: 0 });
  }
});

const enhance = compose(
  withConnect,
  withLifecycle
);

export default enhance(HelpPage);
