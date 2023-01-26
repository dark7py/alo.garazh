export const getFetchConfig = (req) => req && {
  withCredentials: true,
  headers: {
    Cookie: req.headers.cookie || '',
    'X-Forwarded-For':
      req.header('y-real-ip') || req.header('x-forwarded-for') || req.connection.remoteAddress
  }
};
