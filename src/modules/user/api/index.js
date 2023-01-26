import AbortController from 'abort-controller';

import { urls } from 'modules/user/configs';
import {
  getHeadersWithCsrf, fetchJSON, getRequestId, getIP
} from 'utils';

export const fetchLocationInfoByRequest = (request) => {
  const controller = new AbortController();

  setTimeout(() => {
    controller.abort();
  }, 500);

  const url = new URL(urls.geolocationByIp);
  url.searchParams.set('service', 'garage');

  return fetchJSON(url.toString(), {
    signal: controller.signal,
    headers: {
      'X-Req-Id': getRequestId(request),
      'X-Forwarded-For-Y': getIP(request),
      Cookie: request.header('cookie')
    }
  });
};

export const fetchUserInfo = async (cookie) => {
  const host = process.env.APP_HOST || '';
  // Прокидываем куки с фронта
  const config = cookie && {
    headers: {
      withCredentials: true,
      Cookie: cookie
    }
  };

  const userInfo = await fetchJSON(`${host}${urls.userInfo}`, config);

  return userInfo;
};

export const requestLogout = () => fetch(urls.logout);

export const requestLoginSMS = (body) => fetchJSON(urls.loginSMS, {
  method: 'POST',
  headers: getHeadersWithCsrf(),
  body
});

export const requestLogin = (phone, body) => fetchJSON(`${urls.login}/${phone}`, {
  method: 'POST',
  headers: getHeadersWithCsrf(),
  body
});

export const requestFeedback = (body) => fetchJSON(`${urls.feedback}`, {
  method: 'POST',
  headers: getHeadersWithCsrf(),
  body
});


export const requestSubscribes = (body) => fetchJSON(`${urls.subscribes}`, {
  method: 'POST',
  headers: getHeadersWithCsrf(),
  body
});
