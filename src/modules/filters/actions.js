import * as constants from './constants';

export const setDailyRent = (value) => ({
  type: constants.SET_DAILY_RENT,
  payload: value
});

export const changeFiltersList = (value, id) => ({
  type: constants.CHANGE_FILTERS_LIST,
  payload: { id, value }
});


export const changeConditions = (id) => ({
  type: constants.CHANGE_CONDITIONS,
  payload: id
});

export const changeIncluded = (event) => ({
  type: constants.CHANGE_INCLUDED,
  payload: event.target.id
});

export const clearFilters = (event) => ({
  type: constants.CLEAR_FILTERS,
  payload: event.target.id
});

export const changeCertified = () => ({ type: constants.CHANGE_CERTIFIED });

export const changeNoDeposit = () => ({ type: constants.CHANGE_NO_DEPOSIT });

export const changeSelfEmployed = () => ({ type: constants.CHANGE_SELF_EMPLOYED });


export const changeTumbler = (event) => ({
  type: constants.CHANGE_TUMBLER,
  payload: event
});

export const changeSorting = (id) => ({
  type: constants.CHANGE_SORTING,
  payload: id
});

export const changeCommission = (id) => ({
  type: constants.CHANGE_COMMISSION,
  payload: id
});

export const changeModel = (event) => ({
  type: constants.CHANGE_MODEL,
  payload: event && event.value
});

export const changeBrand = (event) => ({
  type: constants.CHANGE_BRAND,
  payload: event && event.value
});

export const changeSearchString = (value) => ({
  type: constants.CHANGE_SEARCH_STRING,
  payload: value
});

export const changePark = (value) => ({
  type: constants.CHANGE_PARK,
  payload: value
});

export const save = () => ({
  type: constants.SAVE
});
