import { connect } from 'react-redux';
import { createSelector } from 'reselect';

import { onClickCallButton } from 'modules/ui/actions';
import { getUserType } from 'modules/user/selectors';

import CallButton from './CallButton';

const mapStateToProps = createSelector(
  getUserType, (userType) => ({ userType })
);

const mapDispatchToProps = {
  onClickCallButton
};

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default withConnect(CallButton);
