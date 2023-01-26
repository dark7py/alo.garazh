import {
  put, takeLatest, select,
  call, cancel, fork, delay
} from 'redux-saga/effects';

import * as uiActions from 'modules/ui/actions';
import * as callActions from 'modules/call/actions';
import * as userActions from 'modules/user/actions';

import { getCityId } from 'modules/ui/selectors';
import { getUserId, getUserName } from 'modules/user/selectors';
import { sortingSelector } from 'modules/filters/selectors';
import { callIdSelector } from 'modules/call/selectors';

import { urls as coreUrls } from 'modules/core/configs';

import {
  driverCall,
  driverCancelCall,
  driverCallStatus,
  driverCallFeedback
} from './api';

import { backendSortingParams } from './configs';

import * as constants from './constants';

// Начинаем звонить
function* startCall({ payload }) {
  const { id, params } = payload;
  const zone = yield select(getCityId);
  const userName = yield select(getUserName);
  const userId = yield select(getUserId);
  const sorting = yield select(sortingSelector);

  const scheduleKind = params && params.schedule_kind;

  yield put(callActions.setCarId(id));

  // Если у пользователя нет имени, он не авторизован
  // или авторизован и не зарегистрирован в Яндексе
  if (!userName) {
    const driverConditionsWasShown = localStorage
      .getItem('driver-conditions-was-shown');

    // Если в localStorage нет ключа driver-conditions-was-shown
    // открываем DriverConditionModal
    if (!driverConditionsWasShown) {
      yield put(uiActions.openDriverConditionModal());
      return;
    }
  }

  // Отправляем запрос в call-центр, получаем id звонка
  try {
    const resp = yield call(driverCall, id, {
      zone,
      advert_schedule: params,
      source: backendSortingParams[sorting]
    });

    // eslint-disable-next-line camelcase
    const { call_id, call_session_id, company_work_time } = resp.payload;

    if (window.ym) {
      // Яндекс.Метрика, цель: Звонок
      yield window.ym(window.ENV.REACT_APP_YA_METRICS_ID,
        'reachGoal', 'call-start', { sorting, userId, scheduleKind });
    }

    // Если парк не работает работает
    // eslint-disable-next-line camelcase
    if (company_work_time && !company_work_time.is_working_now) {
      if (window.ym) {
        // Яндекс.Метрика, цель: Звонок (В не рабочее время)
        yield window.ym(window.ENV.REACT_APP_YA_METRICS_ID,
          'reachGoal', 'call-no-work-time', { sorting, userId, scheduleKind });
      }

      yield put(callActions.setCompanyNotWork(company_work_time));
      yield put(uiActions.openDontAcceptCallsModal());

      return;
    }

    if (window.ym) {
      // Яндекс.Метрика, цель: Звонок (В рабочее время)
      yield window.ym(window.ENV.REACT_APP_YA_METRICS_ID,
        'reachGoal', 'call-start-work-time', { sorting, userId, scheduleKind });
    }

    // Открываем модальное окно звонка
    yield put(uiActions.openCallModal());
    yield put(callActions.setCallId(call_id, call_session_id));

    // Начинаем опрашивать статус
    yield put(callActions.startCheckCallStatus());
  } catch (error) {
    yield put(uiActions.closeCallModal());

    const { status } = error;

    if (status === 403) {
      // Если протух csrf токен, запрашиваем новый
      yield fetch(coreUrls.csrf).then((res) => res);
      yield put(callActions.startCall(id, params));
      return;
    }

    if (status === 401) {
      yield put(userActions.setErrorLogin('Требуется повторная авторзизация'));

      yield put(uiActions.openLoginModal());
      return;
    }

    yield put({
      type: constants.START_CALL_FAILED,
      payload: error
    });
  }
}

// Прерываем звонок
function* stopCall() {
  const id = yield select(callIdSelector);

  yield call(driverCancelCall, id);

  yield put(callActions.stopCheckCallStatus());
  yield put(uiActions.closeCallModal());
  yield put(callActions.clearCall());
}

// Опрос статуса звонка
function* checkCallStatusRun() {
  const sorting = yield select(sortingSelector);
  const userId = yield select(getUserId);

  while (true) {
    const callId = yield select(callIdSelector);
    // Запрос статуса
    try {
      const { payload } = yield call(driverCallStatus, callId);

      // Записываем статус
      yield put(callActions.setCallStatus(payload));

      const { status } = payload;

      // Если звонок прошел успешно,
      // останавливаем и открываем окно с фидбэком
      if (status === 'success') {
        yield put({ type: constants.SUCCESS_CALL });

        yield put(uiActions.closeCallModal());
        yield put(uiActions.openFeedbackModal());

        if (window.ym) {
          // Яндекс.Метрика, цель: Успешный звонок
          yield window.ym(window.ENV.REACT_APP_YA_METRICS_ID,
            'reachGoal', 'call-success', { sorting, userId });
        }

        yield put(callActions.stopCheckCallStatus());
      }

      // Если нет, просто останавливаем звонок
      if (status === 'failed') {
        yield put(callActions.failureCall());

        if (window.ym) {
          // Яндекс.Метрика, цель: Не удалось связаться
          yield window.ym(window.ENV.REACT_APP_YA_METRICS_ID,
            'reachGoal', 'call-failed', { sorting, userId });
        }

        yield put(callActions.stopCheckCallStatus());
      }
    } catch (error) {
      // Если протух csrf токен, запрашиваем новый
      if (error.status === 403) {
        yield fetch(coreUrls.csrf).then((res) => res);
      }

      yield put({
        type: constants.CHECK_CALL_STATUS_FAILED
      });

      yield put(callActions.stopCheckCallStatus());
      yield put(uiActions.closeCallModal());
      yield put(callActions.clearCall());
    }

    // Опрашиваем каждые 5 секунд
    yield delay(5000);
  }
}

let checkCallStatusTask;

// Запуска опрашивалки статуса
function* checkCallStatusStart() {
  if (checkCallStatusTask) {
    yield cancel(checkCallStatusTask);
  }

  checkCallStatusTask = yield fork(checkCallStatusRun);
}

// Остановка опрашивалки статуса
function* checkCallStatusStop() {
  if (checkCallStatusTask) {
    yield cancel(checkCallStatusTask);
  }
}

// Отправка фидбэка
function* sendFeedback({ payload }) {
  const { id, body } = payload;
  const sorting = yield select(sortingSelector);
  const userId = yield select(getUserId);

  try {
    yield call(driverCallFeedback, id, body);
    yield put({ type: constants.SEND_FEEDBACK_SUCCEEDED });

    if (window.ym) {
      // Яндекс.Метрика, цель: Отправка формы обратной связи
      yield window.ym(window.ENV.REACT_APP_YA_METRICS_ID,
        'reachGoal', 'feel-feedback-form', { sorting, userId });
    }

    yield delay(3000);
    yield put(uiActions.closeFeedbackModal());
    yield put(callActions.stopCall());
  } catch (error) {
    // Если протух csrf токен, запрашиваем новый
    if (error.status === 403) {
      yield fetch(coreUrls.csrf).then((res) => res);
    }
    yield put({ type: constants.SEND_FEEDBACK_FAILED, error });
  }
}

export function* callSaga() {
  yield takeLatest(constants.START_CALL_REQUESTED, startCall);
  yield takeLatest(constants.STOP_CALL, stopCall);
  yield takeLatest(constants.START_CHECK_CALL_STATUS, checkCallStatusStart);
  yield takeLatest(constants.STOP_CHECK_CALL_STATUS, checkCallStatusStop);
  yield takeLatest(constants.SEND_FEEDBACK_REQUESTED, sendFeedback);
}
