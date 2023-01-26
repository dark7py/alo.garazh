import * as constants from './constants';

export const setCity = (city) => ({
  type: constants.SET_CITY,
  payload: city
});

export const setIsMobile = (isMobile) => ({
  type: constants.SET_IS_MOBILE,
  payload: isMobile
});

export const setIsDesktopFiltersOpen = (value) => ({
  type: constants.SET_IS_DESKTOP_FILTERS_OPEN,
  payload: value
});

export const openLoginModal = () => ({ type: constants.OPEN_LOGIN_MODAL });
export const closeLoginModal = () => ({ type: constants.CLOSE_LOGIN_MODAL });

export const openCityModal = () => ({ type: constants.OPEN_CITY_MODAL });
export const closeCityModal = () => ({ type: constants.CLOSE_CITY_MODAL });

export const onClickCallButton = (id, params) => ({
  type: constants.CLICK_CALL_BUTTON,
  payload: { id, params }
});

export const setMapCenter = (center) => ({
  type: constants.SET_MAP_CENTER,
  payload: center
});

export const setMapZoom = (zoom) => ({
  type: constants.SET_MAP_ZOOM,
  payload: zoom
});

export const addSelectedOffersPoints = (ids) => ({
  type: constants.SELECTED_OFFERS_POINTS_ADDED,
  payload: ids
});

export const cleanSelectedOffersPoints = () => ({
  type: constants.CLEAN_SELECTED_OFFERS_POINTS
});

export const setFeedbackSuccess = (value) => ({
  type: constants.SET_FEEDBACK_SUCCESS,
  payload: value
});

export const openDriverConditionModal = () => ({
  type: constants.OPEN_DRIVER_CONDITION_MODAL
});

export const closeDriverConditionModal = () => ({
  type: constants.CLOSE_DRIVER_CONDITION_MODAL
});

export const openDontAcceptCallsModal = () => ({ type: constants.OPEN_DONT_ACCEPT_CALLS_MODAL });
export const closeDontAcceptCallsModal = () => ({ type: constants.CLOSE_DONT_ACCEPT_CALLS_MODAL });


export const openCallModal = () => ({ type: constants.OPEN_CALL_MODAL });
export const closeCallModal = () => ({ type: constants.CLOSE_CALL_MODAL });

export const openFeedbackModal = () => ({ type: constants.OPEN_FEEDBACK_MODAL });
export const closeFeedbackModal = () => ({ type: constants.CLOSE_FEEDBACK_MODAL });

export const reset = () => ({ type: constants.RESET });

export const subscribeSend = (email) => ({
  type: constants.SEND_SUBSCRIBE,
  payload: email
});

export const setSubscribeSuccess = () => ({ type: constants.SET_SUBSCRIBE_SUCCESS });

export const clickDropCallButton = () => ({ type: constants.CLICK_DROP_CALL_BUTTON });

export const setOfferPage = (page) => ({ type: constants.SET_OFFERS_PAGE, payload: page });


export const setIsMainPage = (value) => ({
  type: constants.SET_IS_MAIN_PAGE,
  payload: value
});
