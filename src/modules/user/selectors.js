import { createSelector } from 'reselect';

export const getUser = (state) => state.user;

export const getGeolocation = createSelector(
  getUser,
  (user) => user.geolocation
);

export const getUserLocation = createSelector(
  getGeolocation,
  (geolocation) => geolocation && geolocation.name
);

export const getUserCoordinates = createSelector(
  getGeolocation,
  (geolocation) => geolocation && ({
    lat: geolocation.latitude,
    lng: geolocation.longitude
  })
);


export const getUserInfo = createSelector(
  getUser,
  (user) => ({
    userName: user.userName,
    userType: user.userType,
    userPhone: user.userPhone,
    userEmail: user.userEmail
  })
);

export const getUserType = createSelector(
  getUser,
  (user) => user.userType
);

export const getUserPhone = createSelector(
  getUser,
  (user) => user.userPhone
);

export const getUserName = createSelector(
  getUser,
  (user) => user.userName
);

export const getUserId = createSelector(
  getUser,
  (user) => user.userId
);

export const isAuthorizedSelector = createSelector(
  getUser,
  (user) => user.authorized
);

export const isSmsRequestedSelector = createSelector(
  getUser,
  (user) => user.smsRequested
);

export const userErrorSelector = createSelector(
  getUser,
  (user) => user.error
);

export const isProcessingSelector = createSelector(
  getUser,
  (user) => user.isProcessing
);
