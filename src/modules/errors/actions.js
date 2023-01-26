import * as constants from 'modules/errors/constants';

export const setErrorPage = (error) => ({
  type: constants.SET_ERROR_PAGE,
  payload: error
});

export const clearErrors = () => ({ type: constants.CLEAR_ERRORS });

export const clearModalErrors = () => ({ type: constants.CLEAR_MODAL_ERRORS });
