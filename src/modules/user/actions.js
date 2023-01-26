import * as constants from './constants';

// fetchUserGeolocation
export const fetchUserGeolocation = () => ({
  type: constants.USER_GEOLOCATION_REQUESTED,
  payload: {}
});

export const userGeolocationRequestSucceeded = (geolocation, ip) => ({
  type: constants.USER_GEOLOCATION_SUCCEEDED,
  payload: { geolocation, ip }
});

export const userGeolocationRequestFailed = (error) => ({
  type: constants.USER_GEOLOCATION_FAILED,
  payload: error
});

// fetchUserInfo
export const getUserInfo = () => ({
  type: constants.USER_INFO_REQUESTED
});

export const userInfoRequestSucceeded = (userInfo) => ({
  type: constants.USER_INFO_SUCCEEDED,
  payload: userInfo
});

export const userInfoRequestFailed = (error) => ({
  type: constants.USER_INFO_FAILED,
  payload: error
});

// logout
export const logout = () => ({
  type: constants.LOGOUT_REQUESTED
});

export const logoutSucceeded = () => ({
  type: constants.LOGOUT_SUCCEEDED
});

export const logoutFailed = (error) => ({
  type: constants.LOGOUT_FAILED,
  payload: error
});

/**
 * Получаем SMS для авторизации
 */
export const getLoginSms = (body) => ({
  type: constants.LOGIN_SMS_REQUESTED,
  payload: body
});

export const getLoginSmsSucceeded = () => ({
  type: constants.LOGIN_SMS_SUCCEEDED
});

export const getLoginSmsFailed = (error) => ({
  type: constants.LOGIN_SMS_FAILED,
  payload: error
});


/**
  * Авторизация
  */
export const login = (phone, body) => ({
  type: constants.LOGIN_REQUESTED,
  payload: { phone, body }
});

export const loginSucceeded = () => ({
  type: constants.LOGIN_SUCCEEDED
});

export const loginFailed = (error) => ({
  type: constants.LOGIN_FAILED,
  payload: error
});

export const reset = () => ({ type: constants.RESET });
export const resetError = () => ({ type: constants.RESET_ERROR });


/**
 * Подписка
 */
export const subscribe = (body) => ({
  type: constants.SUBSCRIBES_REQUESTED,
  payload: body
});

export const subscribeSucceeded = () => ({
  type: constants.SUBSCRIBES_SUCCEEDED
});

export const subscribeFailed = (error) => ({
  type: constants.SUBSCRIBES_FAILED,
  payload: error
});

/**
 * Отправка фидбэка
 */
export const feedback = (body) => ({
  type: constants.FEEDBACK_REQUESTED,
  payload: body
});

export const feedbackSucceeded = () => ({
  type: constants.FEEDBACK_SUCCEEDED
});

export const feedbackFailed = (error) => ({
  type: constants.FEEDBACK_FAILED,
  payload: error
});


export const setErrorLogin = (text) => ({ type: constants.SET_ERROR_LOGIN, payload: text });
export const setErrorSms = (text) => ({ type: constants.SET_ERROR_SMS, payload: text });

export const setIsProcessing = (value) => ({ type: constants.SET_IS_PROCESSING, payload: value });
