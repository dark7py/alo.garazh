import { connect } from 'react-redux';
import { createSelector } from 'reselect';

import { subscribe } from 'modules/user/actions';
import {
  subscribeSuccessSelector
} from 'modules/ui/selectors';
import {
  filtersSelector
} from 'modules/filters/selectors';

import SubscribeForm from './SubscribeForm';

const mapStateToProps = createSelector(
  subscribeSuccessSelector,
  filtersSelector,
  (subscribeSuccess, filters) => ({
    subscribeSuccess,
    filters
  })
);

const mapDispatchToProps = {
  subscribe
};

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default withConnect(SubscribeForm);
