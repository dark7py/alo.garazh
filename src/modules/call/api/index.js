import { getHeadersWithCsrf, fetchJSON } from 'utils';
import { urls } from '../configs';

export const driverCall = async (id, body) => fetchJSON(`${urls.driverCall}/${id}`, {
  method: 'POST',
  withCredentials: true,
  headers: getHeadersWithCsrf(),
  body
});

export const driverCancelCall = (id) => fetchJSON(`${urls.cancelCalls}/${id}`, {
  method: 'POST',
  withCredentials: true,
  headers: getHeadersWithCsrf()
});

export const driverCallFeedback = (id, body) => fetchJSON(`${urls.calls}/${id}/feedback`, {
  method: 'POST',
  withCredentials: true,
  headers: getHeadersWithCsrf(),
  body
});

export const driverCallStatus = (id) => fetchJSON(`${urls.driverCallStatus}/${id}`);
