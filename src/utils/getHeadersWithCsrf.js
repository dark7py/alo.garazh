import Cookies from 'es-cookies';

export const getHeadersWithCsrf = () => (
  { 'X-Csrf-Token': Cookies.get('csrf') }
);
