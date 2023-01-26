import { put, call, select } from 'redux-saga/effects';

import * as userSagas from 'modules/user/userSaga';
import * as dataSaga from 'modules/data/dataSaga';

import { setErrorPage } from 'modules/errors/actions';
import { setCity, setIsMobile } from 'modules/ui/actions';

import {
  getDefaultZone,
  getCitiesDirection,
  getAllZonesDirection
} from 'modules/data/selectors';
import { getUserCoordinates } from 'modules/user/selectors';
import { getUrlParams } from 'modules/router/selectors';

import { getZone, getCSRF } from 'modules/core/api';

export function* checkCity({ req, res }) {
  // Доступные зоны
  const cities = yield select(getCitiesDirection);
  const allZones = yield select(getAllZonesDirection);

  // Проверяем есть ли в справочнике доступные зоны
  if (!cities) {
    yield put(setErrorPage('Что-то пошло не так'));
    res.status(500);
    return;
  }

  const params = yield select(getUrlParams);

  // Если указан город в урле
  if (params.city) {
    if ((params.carId && allZones[params.city]) || cities[params.city]) {
      yield put(setCity(allZones[params.city].group));
    } else {
      yield put(setErrorPage('Такой страницы нет'));
      res.status(404);
    }
    // Если города не указан в урле, провеяем куку
  } else if (req.cookies.city) {
    if (cities[req.cookies.city]) {
      yield put(setCity(req.cookies.city));
    }
    // Если первый вход, проверяем по IP
  } else if (process.env.DETECT_GEOLOCATION) {
    // Определяем зонну по IP
    yield userSagas.geolocateUser({ req });
    const geo = yield select(getUserCoordinates);

    if (geo) {
      const { lat, lng } = geo;

      const defaultZone = yield select(getDefaultZone);

      try {
        const zone = yield call(getZone, lat, lng);

        const detectedCity = zone
          // Находим зону средди всех, проверяем открыта ли она, если да устанавливаем
          ? allZones[zone.code] && cities[allZones[zone.code].group] && allZones[zone.code].group
          : defaultZone.code;

        if (detectedCity) {
          yield put(setCity(detectedCity));
        } else {
          yield put(setErrorPage('Такой страницы нет'));
          res.status(404);
        }
      } catch (e) {
        console.log('error detect zone');
      }
    }
  }
}

// CSRF
export function* csrf({ res }) {
  const response = yield call(getCSRF);
  const rawHeaders = response.headers.raw();

  if (rawHeaders && rawHeaders['set-cookie']) {
    res.setHeader('set-cookie', rawHeaders['set-cookie']);
  }
}

export function* prefetchCoreSaga({ req, res }) {
  const isMobile = req.device.type !== 'desktop';
  yield put(setIsMobile(isMobile));

  // CSRF
  yield csrf({ res });
  // Авторизация
  yield userSagas.getUserInfo({ req });
  // Поолучаем справочники
  yield dataSaga.directories();
  // Определяем город
  yield checkCity({ req, res });
  // Получаем список брэндов
  yield dataSaga.brands();
}
