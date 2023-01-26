import {
  put, takeLatest, take,
  select, race
} from 'redux-saga/effects';

import * as callConstants from 'modules/call/constants';
import * as userConstants from 'modules/user/constants';
import * as uiConstants from 'modules/ui/constants';
import * as dataConstants from 'modules/data/constants';

import * as userActions from 'modules/user/actions';
import * as callActions from 'modules/call/actions';
import * as dataActions from 'modules/data/actions';
import * as uiActions from 'modules/ui/actions';
import * as filtersActions from 'modules/filters/actions';

import { isAuthorizedSelector, getUserId } from 'modules/user/selectors';
import { filtersSelector, sortingSelector } from 'modules/filters/selectors';
import { getCityCoordinates } from 'modules/data/selectors';

import { yaMetricReachGoal } from 'utils';

function* clickCallButton({ payload }) {
  const { id, params } = payload;
  const isAuthorized = yield select(isAuthorizedSelector);
  const sorting = yield select(sortingSelector);
  const userId = yield select(getUserId);

  // Яндекс.Метрика, цель: Все клики
  yaMetricReachGoal('all-call-click', { scheduleKind: params.schedule_kind });

  // Если автоизованы, начинаем звонить
  if (isAuthorized) {
    // Яндекс.Метрика, цель: Водитель кликнул по кнопке "Связаться"
    yaMetricReachGoal('call-click', { sorting, userId, scheduleKind: params.schedule_kind });

    yield put(callActions.startCall(id, params));
    return;
  }

  // Яндекс.Метрика,
  // цель: Клик по кнопке связаться неавторизованным пользователем
  yaMetricReachGoal('call-click-not-driver', {
    sorting,
    userId,
    scheduleKind: params.schedule_kind
  });

  // Если нет, открываем окно авторизации
  yield put(uiActions.openLoginModal());

  const { success } = yield race({
    // При успешной атворизации, начинаем звонить
    success: take(userConstants.LOGOUT_SUCCEEDED),
    // Если пользователь закрыл окно авторизации,
    // нечего не делаем
    close: take(uiConstants.CLOSE_LOGIN_MODAL)
  });

  if (success) {
    // Ждем когда полуим данные о пользователе и только тогда начинаем звонить
    yield take(userConstants.USER_INFO_SUCCEEDED);
    yield put(callActions.startCall(id, params));
  }
}

function* openLoginModal() {
  const sorting = yield select(sortingSelector);
  const userId = yield select(getUserId);
  // Яндекс.Метрика, цель: Открытие формы "войти"
  yaMetricReachGoal('openLoginForm', { sorting, userId });
}

function* dropCall() {
  const sorting = yield select(sortingSelector);
  const userId = yield select(getUserId);

  // Яндекс.Метрика, цель: Отмена звонка водителем
  yaMetricReachGoal('call-is-canceled', { sorting, userId });

  yield put(uiActions.closeCallModal());
}

function* subscribe({ payload }) {
  const sorting = yield select(sortingSelector);
  const userId = yield select(getUserId);

  // Яндекс.Метрика, цель: Клик по кнопке "Подписаться"
  yaMetricReachGoal('click-subscribe-btn', { sorting, userId });

  const email = payload;
  const filters = yield select(filtersSelector);
  const body = {
    email,
    search_parameters: filters
  };

  yield put(userActions.subscribe(body));
}

function* subscribeSuccess() {
  const sorting = yield select(sortingSelector);
  const userId = yield select(getUserId);

  // Яндекс.Метрика, цель: Отправка формы обратной связи
  yaMetricReachGoal('feel-feedback-form', { sorting, userId });

  yield put(uiActions.setSubscribeSuccess(true));
}

function* feedbackSuccess() {
  yield put(uiActions.setFeedbackSuccess(true));
}

function* companyNotWork() {
  yield put(uiActions.openDontAcceptCallsModal());
}

function* cityChange({ payload }) {
  const city = payload;
  const coordinates = yield select(getCityCoordinates);
  yield put(dataActions.getBrands(city));
  yield put(uiActions.cleanSelectedOffersPoints());
  yield put(dataActions.removeCars());
  yield put(uiActions.setMapCenter([
    coordinates.latitude,
    coordinates.longitude
  ]));
  yield put(uiActions.setMapZoom(10));
  yield put(filtersActions.changePark(null));
}

function* closeLoginModal() {
  yield put(userActions.reset());
}

function* openFilters() {
  yield put(uiActions.setIsDesktopFiltersOpen(true));
}

export function* uiSaga() {
  yield takeLatest(uiConstants.CLICK_CALL_BUTTON, clickCallButton);
  yield takeLatest(uiConstants.OPEN_LOGIN_MODAL, openLoginModal);
  yield takeLatest(uiConstants.CLICK_DROP_CALL_BUTTON, dropCall);
  yield takeLatest(uiConstants.SEND_SUBSCRIBE, subscribe);
  yield takeLatest(callConstants.SET_COMPANY_NOT_WORK, companyNotWork);
  yield takeLatest(userConstants.SUBSCRIBES_SUCCEEDED, subscribeSuccess);
  yield takeLatest(userConstants.FEEDBACK_SUCCEEDED, feedbackSuccess);
  yield takeLatest(uiConstants.SET_CITY, cityChange);
  yield takeLatest(uiConstants.CLOSE_LOGIN_MODAL, closeLoginModal);
  yield takeLatest(dataConstants.PARK_FETCH_SUCCEEDED, openFilters);
}
