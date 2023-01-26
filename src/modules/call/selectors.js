import { createSelector } from 'reselect';

export const callSelector = (store) => store.call;

export const carIdSelector = createSelector(
  callSelector,
  (call) => call.carId
);

export const callIdSelector = createSelector(
  callSelector,
  (call) => call.callId
);

export const callSessionIdSelector = createSelector(
  callSelector,
  (call) => call.sessionId
);

export const callStatusSelector = createSelector(
  callSelector,
  (call) => call.status
);

export const cancelIsPossibleSelector = createSelector(
  callSelector,
  (call) => call.cancel_is_possible
);

export const feedbackSuccessSelector = createSelector(
  callSelector,
  (call) => call.feedbackSuccess
);

export const companyNotWorkSelector = createSelector(
  callSelector,
  (call) => call.companyNotWork
);
