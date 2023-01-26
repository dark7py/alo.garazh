import { put, takeLatest, delay } from 'redux-saga/effects';

import * as dataConstants from 'modules/data/constants';
import * as callConstants from 'modules/call/constants';

import { setErrorPage, clearModalErrors } from './actions';

function* fetchFailure({ payload }) {
  if (!payload) {
    return;
  }

  if (payload.errors) {
    yield put(setErrorPage(payload.errors));
  } else {
    yield put(setErrorPage(payload.status));
  }
}

function* errorModal() {
  yield delay(5000);
  yield put(clearModalErrors());
}

export function* errorsSaga() {
  yield takeLatest(dataConstants.CAR_FETCH_FAILED, fetchFailure);
  yield takeLatest([
    callConstants.CHECK_CALL_STATUS_FAILED,
    callConstants.START_CALL_FAILED
  ], errorModal);
}
