import fetch from 'node-fetch';
import { fetchJSON } from 'utils';

import { urls } from 'modules/core/configs';

export const getZone = async (lat, lng) => {
  const resposne = await fetchJSON(`${process.env.APP_HOST}/${urls.zone}?latitude=${lat}&longitude=${lng}`);

  return resposne;
};

export const getCSRF = async () => {
  const resposne = await fetch(`${process.env.APP_HOST}/${urls.csrf}`);

  return resposne;
};
