import { takeEvery, put, select } from 'redux-saga/effects';
import { push, getSearch } from 'connected-react-router';

import { setFiltersByAction, queryToURL } from 'modules/filters/utils';

import { getIsMap, getQuery } from 'modules/router/selectors';
import { getCarBrands, getPark } from 'modules/data/selectors';
import { getCityId } from 'modules/ui/selectors';
import { getOffersPoints, setPark, removeCars } from 'modules/data/actions';
import { cleanSelectedOffersPoints } from 'modules/ui/actions';
import { composeCarsURL } from 'modules/router/utils';
import { yaMetricReachGoal } from 'utils/yaMetricReachGoal';

import * as constants from './constants';

import {
  brandCodeSelector,
  brandOptionSelector
} from './selectors';

function* getCarBrand(brandId) {
  if (!brandId) {
    return null;
  }

  const brands = yield select(getCarBrands);
  const brand = brands.find((item) => item.id === brandId);

  if (brand) {
    return brand.code.toLowerCase();
  }
  return null;
}

function* getCarModel(modelId) {
  if (!modelId) {
    return null;
  }

  const { models } = yield select(brandOptionSelector);
  const model = models.find((item) => item.id === modelId);

  if (model) {
    return model.code.toLowerCase();
  }
  return null;
}

function* finalizeFiltersChange(isMap) {
  yield put(removeCars());

  if (isMap) {
    yield put(getOffersPoints());
    yield put(cleanSelectedOffersPoints());
  }
}

/*
 * FIXME: why this is implemented as a separate sage?
 * maybe handle this action by `filterChange` saga?
 * the only difference is that finalize actions are not used
 */
function* dailyRentChange(action) {
  const query = yield select(getQuery);
  const newQuery = setFiltersByAction(query, action);
  const searchURL = queryToURL(newQuery);

  yield put(push({ search: searchURL }));
}

function* filterChange(action) {
  const query = yield select(getQuery);
  const isMap = yield select(getIsMap);
  const newQuery = setFiltersByAction(query, action);
  const searchURL = queryToURL(newQuery);

  yield put(push({ search: searchURL }));

  yaMetricReachGoal('filter', newQuery);

  yield finalizeFiltersChange(isMap);
}

function* brandChange({ payload: id }) {
  const isMap = yield select(getIsMap);
  const city = yield select(getCityId);
  const park = yield select(getPark);
  const search = yield select(getSearch);
  const brand = yield getCarBrand(id);

  const url = composeCarsURL({
    city,
    brand,
    park: park && park.slug,
    search,
    isMap
  });

  yield put(push(url));
  yield finalizeFiltersChange(isMap);
}

function* modelChange({ payload: id }) {
  const isMap = yield select(getIsMap);
  const city = yield select(getCityId);
  const park = yield select(getPark);
  const search = yield select(getSearch);
  const brand = yield select(brandCodeSelector);
  const model = yield getCarModel(id);

  const url = composeCarsURL({
    city,
    brand,
    model,
    park: park && park.slug,
    search,
    isMap
  });

  yield put(push(url));
  yield finalizeFiltersChange(isMap);
}


function* parkChange({ payload: parkOption }) {
  const isMap = yield select(getIsMap);
  const city = yield select(getCityId);
  const search = yield select(getSearch);

  yield put(setPark(parkOption));

  const url = composeCarsURL({
    city,
    park: parkOption && parkOption.value,
    search,
    isMap
  });

  yield put(push(url));
  yield finalizeFiltersChange(isMap);
}

function* clearFilters() {
  const isMap = yield select(getIsMap);
  const city = yield select(getCityId);

  const url = composeCarsURL({ city, isMap });
  yield put(push(url));
  yield put(setPark(null));

  yield finalizeFiltersChange(isMap);
}

export function* filtersSaga() {
  yield takeEvery([
    constants.CHANGE_CERTIFIED,
    constants.CHANGE_COMMISSION,
    constants.CHANGE_CONDITIONS,
    constants.CHANGE_INCLUDED,
    constants.CHANGE_FILTERS_LIST,
    constants.CHANGE_SEARCH_STRING,
    constants.CHANGE_SORTING,
    constants.CHANGE_NO_DEPOSIT,
    constants.CHANGE_SELF_EMPLOYED
  ], filterChange);
  yield takeEvery(constants.SET_DAILY_RENT, dailyRentChange);
  yield takeEvery(constants.CLEAR_FILTERS, clearFilters);
  yield takeEvery(constants.CHANGE_BRAND, brandChange);
  yield takeEvery(constants.CHANGE_MODEL, modelChange);
  yield takeEvery(constants.CHANGE_PARK, parkChange);
}
