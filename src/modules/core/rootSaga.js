import { all, spawn } from 'redux-saga/effects';

import { uiSaga } from 'modules/ui';
import { userSaga } from 'modules/user';
import { dataSaga } from 'modules/data';
import { errorsSaga } from 'modules/errors';
import { filtersSaga } from 'modules/filters';
import { callSaga } from 'modules/call';

const sagas = [
  uiSaga,
  userSaga,
  dataSaga,
  errorsSaga,
  filtersSaga,
  callSaga
];

export function* rootSaga() {
  yield all(sagas.map(spawn));
}
