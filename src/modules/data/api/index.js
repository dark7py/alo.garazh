import { urls } from 'modules/data/configs';
import { getCarDetailsUrl } from 'modules/data/utils';
import { fetchJSON } from 'utils';
import { parkSuggestsUrl } from 'blocks/ParkSelector/configs';

export const getDirectories = async () => {
  const host = process.env.APP_HOST || '';

  const res = await fetchJSON(`${host}${urls.directories}`);
  return res;
};

export const getBrands = async (city) => {
  const host = process.env.APP_HOST || '';

  const res = await fetchJSON(`${host}${urls.carBrands}?zone=${city}`);
  return res;
};

export const getCars = async (zone = 'spb', filter = '', page = '1') => {
  const host = process.env.APP_HOST || '';

  const res = await fetchJSON(`${host}${urls.carsSearch}?zone_name=${zone}&page=${page}${filter}`);
  return res;
};

export const getCar = async (carId, userType, req) => {
  const realIp = req && (req.header('y-real-ip') || req.header('x-forwarded-for') || req.connection.remoteAddress);
  const config = req && {
    headers: {
      withCredentials: true,
      Cookie: req.headers.cookie,
      'X-Forwarded-For': realIp,
      'Y-Real-IP': realIp
    }
  };

  const carDetailsUrl = getCarDetailsUrl(userType);

  const host = process.env.APP_HOST || '';

  const res = await fetchJSON(`${host}${carDetailsUrl}/${carId}`, config);
  return res;
};

export const getParkCars = async (parkId, zone = 'spb') => {
  const host = process.env.APP_HOST || '';

  const res = await fetchJSON(`${host}${urls.carsSearch}?zone_name=${zone}&company_id=${parkId}`);
  return res;
};

export const getOffersPoints = async (zone = 'spb', filters = '') => {
  const host = process.env.APP_HOST || '';

  const res = await fetchJSON(`${host}${urls.offersPoints}?zone_name=${zone}&${filters}`);
  return res;
};

export const getMapCars = async (ids) => {
  const host = process.env.APP_HOST || '';

  const res = await fetchJSON(`${host}${urls.carsSearch}?only_id=${ids.join(',')}`);
  return res;
};

export const getPark = async (parkSlug, req) => {
  const host = process.env.APP_HOST || '';
  const cookies = req && req.headers.cookie;
  const config = req && {
    headers: {
      withCredentials: true,
      Cookie: cookies,
      'X-Forwarded-For':
        req.header('y-real-ip') || req.header('x-forwarded-for') || req.connection.remoteAddress
    }
  };

  const response = await fetchJSON(`${host}${parkSuggestsUrl}?term=${parkSlug}&exact_slug=true`, config)
    .then((res) => res.payload.items);

  return response;
};
