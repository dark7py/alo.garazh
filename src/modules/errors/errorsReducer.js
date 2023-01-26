import * as constants from './constants';
// import * as callActions from '../call/actions';

export const errorsInitialState = {
  errorPage: null,
  errorModal: null
};

// const errorModalMessage = 'Чтото пошло не так. Попробуйте еще раз через пару минут.';

export const errorsReducer = (state = errorsInitialState, action) => {
  switch (action.type) {
    case constants.SET_ERROR_PAGE: {
      return {
        ...state,
        errorPage: action.payload
      };
    }
    // case callActions.START_CALL_FAILURE: {
    //   return {
    //     ...state,
    //     errorModal: errorModalMessage
    //   };
    // }
    // case callActions.CHECK_CALL_STATUS_FAILURE: {
    //   return {
    //     ...state,
    //     errorModal: errorModalMessage
    //   };
    // }
    case constants.CLEAR_ERRORS: {
      return errorsInitialState;
    }
    case constants.CLEAR_MODAL_ERRORS: {
      return {
        ...state,
        errorModal: null
      };
    }
    default: return state;
  }
};
