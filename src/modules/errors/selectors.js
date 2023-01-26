import { createSelector } from 'reselect';

export const errorsSelector = (store) => store.errors;

export const errorPageSelector = createSelector(
  errorsSelector,
  (errors) => errors.errorPage
);

export const errorModalSelector = createSelector(
  errorsSelector,
  (errors) => errors.errorModal
);
