import url from 'url';
import { select, put } from 'redux-saga/effects';

import { getCar, getPark } from 'modules/data/selectors';
import { getUrlParams } from 'modules/router/selectors';
import { getCityId } from 'modules/ui/selectors';

import { setIsMainPage } from 'modules/ui/actions';

import {
  car,
  cars,
  park,
  parkCars
} from 'modules/data/dataSaga';

export function* prefetchMainPage({ res, req }) {
  const params = yield select(getUrlParams);
  if (params.park) {
    yield park({ payload: params.park, req });
    const currentPark = yield select(getPark);

    if (!currentPark) {
      // Если нет машины редиректим на страницу с городом
      const city = yield select(getCityId);

      res.writeHead(302, {
        Location: url.format({
          host: `/${city}`,
          query: req.query
        })
      });
    }
  }

  yield cars({ payload: 1 });
  // говорим приложению что это главная страница, для отображения поиска
  yield put(setIsMainPage(true));
}

export function* prefetchCarPage({ res, req }) {
  const params = yield select(getUrlParams);
  const { carId } = params;

  yield car({ payload: carId, req });

  const currentCar = yield select(getCar);

  if (currentCar) {
    if (params.city !== currentCar.zone_name) {
      res.writeHead(301, {
        Location: url.format({
          host: `/${currentCar.zone_name}/arenda_auto_${carId}`,
          query: req.query
        })
      });
      return;
    }

    yield parkCars({ payload: currentCar.companyId });
  } else {
    // Если нет машины редиректим на страницу с городом
    const city = yield select(getCityId);

    res.writeHead(302, {
      Location: url.format({
        host: `/${city}`,
        query: req.query
      })
    });
  }
}
