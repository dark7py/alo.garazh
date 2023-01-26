import * as constants from './constants';

const initialState = {
  carId: null,
  callId: null,
  sessionId: null,
  status: null,
  cancel_is_possible: false,
  feedbackSuccess: false,
  companyNotWork: null
};

export const callReducer = (state = initialState, action) => {
  switch (action.type) {
    case constants.SET_CAR_ID: {
      return {
        ...state,
        carId: action.payload
      };
    }
    case constants.SET_CALL_ID: {
      const { id, sessionId } = action.payload;
      return {
        ...state,
        callId: id,
        sessionId
      };
    }
    case constants.CHECK_CALL_STATUS: {
      return {
        ...state,
        ...action.payload
      };
    }
    case constants.FAILURE_CALL: {
      return {
        ...state,
        cancelIsPossible: false
      };
    }
    case constants.SEND_FEEDBACK_SUCCEEDED: {
      return {
        ...state,
        feedbackSuccess: true
      };
    }
    case constants.SET_COMPANY_NOT_WORK: {
      return {
        ...state,
        companyNotWork: action.payload
      };
    }
    case constants.CLEAR_CALL: {
      return initialState;
    }
    default:
      return state;
  }
};
