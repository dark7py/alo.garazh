import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import { lifecycle, compose } from 'recompose';

import {
  isMobileSelector,
  getCityId,
  feedbackSuccessSelector
} from 'modules/ui/selectors';
import { setIsMobile, setFeedbackSuccess } from 'modules/ui/actions';
import { feedback } from 'modules/user/actions';
import { getAllZones } from 'modules/data/selectors';
import { getUserInfo } from 'modules/user/selectors';

import FeedbackPage from './FeedbackPage';

const mapStateToProps = createSelector(
  isMobileSelector,
  getCityId,
  getAllZones,
  getUserInfo,
  feedbackSuccessSelector,
  (isMobile, city, zones, userInfo, feedbackSuccess) => ({
    isMobile, city, zones, userInfo, feedbackSuccess
  })
);

const mapDispatchToProps = {
  setIsMobile,
  feedback,
  setFeedbackSuccess
};

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withLifecycle = lifecycle({
  componentDidMount() {
    // Сколим страницу на верх
    window.scrollTo({ top: 0 });
  },
  componentWillUnmount() {
    this.props.setFeedbackSuccess(false);
  }
});

const enhance = compose(
  withConnect,
  withLifecycle
);

export default enhance(FeedbackPage);
