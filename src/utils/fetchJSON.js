import fetch from 'node-fetch';

export async function fetchJSON(url, init) {
  const response = await fetch(url, init);

  if (!response.ok) {
    try {
      const parsedJson = await response.json();
      return Promise.reject(parsedJson);
    } catch (e) {
      return Promise.reject(response);
    }
  }

  if (response.status === 204) {
    return response;
  }

  return response.json();
}
