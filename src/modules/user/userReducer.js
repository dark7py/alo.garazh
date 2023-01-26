import * as constants from './constants';

export const userInitialState = {
  userName: null,
  userType: 'guest',
  userPhone: null,
  userEmail: null,
  userId: null,
  banned: false,
  authorized: false,
  smsRequested: false,
  isProcessing: false,
  error: null,
  ip: null,
  geolocation: null
};

export const userReducer = (state = userInitialState, action) => {
  switch (action.type) {
    case constants.USER_GEOLOCATION_SUCCEEDED: {
      const { geolocation, ip } = action.payload;

      return {
        ...state,
        geolocation,
        ip
      };
    }
    case constants.LOGIN_SMS_REQUESTED: {
      return {
        ...state,
        smsRequested: false
      };
    }
    case constants.LOGIN_SMS_SUCCEEDED: {
      return {
        ...state,
        smsRequested: true,
        error: null
      };
    }
    case constants.LOGIN_SUCCEEDED: {
      return {
        ...state,
        authorized: true
      };
    }
    case constants.LOGOUT_SUCCEEDED: {
      return userInitialState;
    }
    case constants.SET_ERROR_LOGIN: {
      const message = action.payload;
      const error = message.replace(/\n/g, '<br />');

      return {
        ...state,
        authorized: false,
        error
      };
    }

    case constants.SET_ERROR_SMS: {
      const message = action.payload;
      const error = message.replace(/\n/g, '<br />');

      return {
        ...state,
        error
      };
    }
    case constants.USER_INFO_SUCCEEDED: {
      const user = action.payload;

      return {
        ...state,
        ...user,
        authorized: true
      };
    }
    case constants.USER_INFO_FAILED: {
      return userInitialState;
    }
    case constants.RESET: {
      return userInitialState;
    }
    case constants.RESET_ERROR: {
      return {
        ...state,
        error: null
      };
    }
    case constants.SET_IS_PROCESSING: {
      const isProcessing = action.payload;

      return {
        ...state,
        isProcessing
      };
    }
    default:
      return state;
  }
};
