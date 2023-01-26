import { call, put, takeLatest } from 'redux-saga/effects';

import * as actions from 'modules/user/actions';
import * as uiActions from 'modules/ui/actions';

import * as constants from 'modules/user/constants';
import { urls } from 'modules/core/configs';

import {
  fetchLocationInfoByRequest,
  fetchUserInfo,
  requestLogout,
  requestLoginSMS,
  requestLogin,
  requestFeedback,
  requestSubscribes
} from 'modules/user/api';

import { getIP, yaMetricReachGoal } from 'utils';

export function* geolocateUser({ req }) {
  try {
    const location = yield call(fetchLocationInfoByRequest, req);
    const ip = yield call(getIP, req);

    yield put(actions.userGeolocationRequestSucceeded(location, ip));
  } catch (error) {
    yield put(actions.userGeolocationRequestFailed(error));
  }
}

/**
 * Получаем информацию о пользователе
 * url и cookies используются для авторизизации на сервере
 * если ошибка кидаем экшен logout, и очищаем все статусы
 */
export function* getUserInfo({ req }) {
  try {
    const cookies = req && req.headers.cookie;

    const user = yield call(fetchUserInfo, cookies);

    // Если не авторизован прийдет payload.error
    if (user.error) {
      yield put(actions.userInfoRequestFailed(user.error));
      return;
    }

    if (user.banned && user.userType === 'DRIVER') {
      yield put(actions.userInfoRequestFailed());
      return;
    }

    yield put(actions.userInfoRequestSucceeded(user));
  } catch (error) {
    yield put(actions.userInfoRequestFailed(error));
    yield put(actions.logout());
  }
}

/**
 * Закрыть сессию (Выйти)
 */
export function* logout() {
  try {
    yield call(requestLogout);

    yield put(actions.logoutSucceeded());
    yield put(actions.reset());
  } catch (error) {
    yield put(actions.logoutFailed(error));
  }
}

/**
 * Получаем SMS для авторизации
 */
export function* getLoginSMS({ payload }) {
  try {
    const body = payload;
    yield put(actions.setIsProcessing(true));
    yield call(requestLoginSMS, body);

    // Send phone
    yaMetricReachGoal('login-send-phone');

    yield put(actions.getLoginSmsSucceeded());
    yield put(actions.setIsProcessing(false));
  } catch (error) {
    yield put(actions.setIsProcessing(false));
    yield put(actions.getLoginSmsFailed(error));

    if (error.status === 403 && !error.error) {
      // Если протух csrf токен, запрашиваем новый
      fetch(urls.csrf).then((res) => res);
      yield put(actions.setErrorSms('Сессия устарела, Попробуйте еще раз'));
      return;
    }

    const { message } = error.error;
    yield put(actions.setErrorSms(message));
  }
}

/**
 * Авторизация
 * На success устанавливается кука
 */
export function* login({ payload }) {
  try {
    yield put(actions.setIsProcessing(true));
    const { phone, body } = payload;
    yield call(requestLogin, phone, body);

    // Success login
    yaMetricReachGoal('successLogin');

    yield put(actions.loginSucceeded());
    yield put(actions.getUserInfo());
    yield put(actions.setIsProcessing(false));

    // Закрываем окно авторизации
    yield put(uiActions.closeLoginModal());
  } catch (error) {
    yield put(actions.setIsProcessing(false));

    // Error Login
    yaMetricReachGoal('errorLogin');

    yield put(actions.loginFailed(error));

    const { message } = error.error;
    yield put(actions.setErrorLogin(message));
  }
}

export function* feedback({ payload }) {
  try {
    const body = payload;
    yield call(requestFeedback, body);
    yield put(actions.feedbackSucceeded());
  } catch (error) {
    yield put(actions.feedbackFailed(error));
  }
}

export function* subscribe({ payload }) {
  try {
    const body = payload;
    yield call(requestSubscribes, body);
    yield put(actions.subscribeSucceeded());
    // Success subscribe
    yaMetricReachGoal('click-subscribe-btn');
  } catch (error) {
    yield put(actions.subscribeFailed(error));
  }
}

export function* userSaga() {
  yield takeLatest(constants.USER_GEOLOCATION_REQUESTED, geolocateUser);
  yield takeLatest(constants.USER_INFO_REQUESTED, getUserInfo);
  yield takeLatest(constants.LOGOUT_REQUESTED, logout);
  yield takeLatest(constants.LOGIN_SMS_REQUESTED, getLoginSMS);
  yield takeLatest(constants.LOGIN_REQUESTED, login);
  yield takeLatest(constants.FEEDBACK_REQUESTED, feedback);
  yield takeLatest(constants.SUBSCRIBES_REQUESTED, subscribe);
}
