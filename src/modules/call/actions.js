import * as constants from './constants';

export const setCarId = (id) => ({ type: constants.SET_CAR_ID, payload: id });

export const setCallId = (id, sessionId) => ({
  type: constants.SET_CALL_ID,
  payload: { id, sessionId }
});

export const setCallStatus = (data) => ({
  type: constants.CHECK_CALL_STATUS,
  payload: data
});

export const startCall = (id, params) => ({
  type: constants.START_CALL_REQUESTED,
  payload: { id, params }
});

export const stopCall = () => ({ type: constants.STOP_CALL });

export const failureCall = () => ({ type: constants.FAILURE_CALL });

export const clearCall = () => ({ type: constants.CLEAR_CALL });

export const startCheckCallStatus = () => ({ type: constants.START_CHECK_CALL_STATUS });

export const stopCheckCallStatus = () => ({ type: constants.STOP_CHECK_CALL_STATUS });

export const sendFeedback = (id, body) => ({
  type: constants.SEND_FEEDBACK_REQUESTED,
  payload: { id, body }
});

export const setCompanyNotWork = (data) => ({
  type: constants.SET_COMPANY_NOT_WORK,
  payload: data
});
