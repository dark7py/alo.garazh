export const getIP = (req) => {
  const forwardedIp = req.header('y-real-ip') || req.header('x-forwarded-for-y') || req.ip;
  return forwardedIp.split(',')[0];
};
