import {
  call,
  put,
  takeLatest,
  select,
  debounce
} from 'redux-saga/effects';

import * as actions from 'modules/data/actions';
import * as uiActions from 'modules/ui/actions';
import * as constants from 'modules/data/constants';
import * as filtersConstants from 'modules/filters/constants';

import { getCityId } from 'modules/ui/selectors';
import { filterApiUrlSelector } from 'modules/filters/selectors';
import { getIsMap } from 'modules/router/selectors';

import {
  getDirectories,
  getBrands,
  getCars,
  getCar,
  getPark,
  getParkCars,
  getOffersPoints
} from 'modules/data/api';
import { getUserType } from 'modules/user/selectors';

export function* directories() {
  try {
    const directoriesResp = yield call(getDirectories);

    yield put(actions.directoriesRequestSucceeded(directoriesResp.payload));
  } catch (error) {
    yield put(actions.directoriesRequestFailed(error));
  }
}

export function* brands() {
  try {
    const cityId = yield select(getCityId);
    const brandsResp = yield call(getBrands, cityId);

    yield put(actions.brandsRequestSucceeded(brandsResp.payload));
  } catch (error) {
    yield put(actions.brandsRequestFailed(error));
  }
}

export function* cars({ payload }) {
  try {
    const page = payload;
    const cityId = yield select(getCityId);
    const filters = yield select(filterApiUrlSelector);

    const carsResp = yield call(getCars, cityId, filters, page);

    yield put(actions.carsRequestSucceeded(carsResp.payload));
  } catch (error) {
    yield put(actions.carsRequestFailed(error));
  }
}

export function* car({ payload, req }) {
  try {
    const userType = yield select(getUserType);

    const carId = payload;

    const carsResp = yield call(getCar, carId, userType, req);

    yield put(actions.carRequestSucceeded(carsResp.payload.items[0]));
  } catch (error) {
    yield put(actions.carRequestFailed(error));
  }
}

export function* park({ payload, req }) {
  try {
    const parkSlug = payload;

    const parks = yield call(getPark, parkSlug, req);

    yield put(actions.parkBySlugRequestSucceeded(parks[0] || null));
  } catch (error) {
    yield put(actions.parkBySlugRequestFailed(error));
  }
}

export function* parkCars({ payload }) {
  try {
    const parkId = payload;
    const cityId = yield select(getCityId);

    const carsResp = yield call(getParkCars, parkId, cityId);

    yield put(actions.parkCarsRequestSucceeded(carsResp.payload.items));
  } catch (error) {
    yield put(actions.parkCarsRequestFailed(error));
  }
}

export function* offersPoints() {
  try {
    const cityId = yield select(getCityId);
    const filters = yield select(filterApiUrlSelector);

    const carsResp = yield call(getOffersPoints, cityId, filters);

    yield put(actions.offersPointsRequestSucceeded(carsResp.payload.items));
  } catch (error) {
    yield put(actions.offersPointsRequestFailed(error));
  }
}

export function* refreshCars() {
  const isMap = yield select(getIsMap);
  yield put(actions.removeCars());

  if (isMap) {
    yield put(actions.getOffersPoints());
    yield put(uiActions.cleanSelectedOffersPoints());
  }
}


export function* dataSaga() {
  yield takeLatest(constants.CARS_FETCH_REQUESTED, cars);
  yield takeLatest(constants.CAR_FETCH_REQUESTED, car);
  yield takeLatest(constants.PARK_CARS_FETCH_REQUESTED, parkCars);
  yield takeLatest(constants.PARK_FETCH_REQUESTED, park);
  yield takeLatest(constants.OFFERS_POINTS_FETCH_REQUESTED, offersPoints);
  yield takeLatest(constants.BRANDS_FETCH_REQUESTED, brands);
  yield debounce(1000, filtersConstants.SET_DAILY_RENT, refreshCars);
}
