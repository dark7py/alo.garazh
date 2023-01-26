import { connect } from 'react-redux';
import { createSelector } from 'reselect';


import { getUserType } from 'modules/user/selectors';
import {
  isMobileSelector,
  isTaxiparkDraftSelector,
  isMainPageSelector
} from 'modules/ui/selectors';

import Header from './Header';

const mapStateToProps = createSelector(
  getUserType,
  isMobileSelector,
  isTaxiparkDraftSelector,
  isMainPageSelector,
  (userType, isMobile, isTaxiparkDraft, isMainPage) => ({
    userType,
    isMobile,
    isTaxiparkDraft,
    isMainPage
  })
);

const mapDispatchToProps = null;

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default withConnect(Header);
