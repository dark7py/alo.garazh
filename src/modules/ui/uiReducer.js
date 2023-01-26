import * as constants from './constants';

export const uiInitialState = {
  isMobile: false,
  isMap: false,
  isMainPage: false,
  city: 'spb',
  isLoginModal: false,
  isCallModal: false,
  isDriverConditionsModal: false,
  isFeedbackModal: false,
  isCityModal: false,
  isDontAcceptCallsModal: false,
  isDesktopFiltersOpen: false,
  feedbackSuccess: false,
  selectedOffersPointsIds: [],
  mapCenter: [59.9386, 30.3141],
  mapZoom: 10,
  isTaxiparkDraft: null,
  offersPage: 0,
  subscribeSuccess: false
};

export const uiReducer = (state = uiInitialState, action) => {
  switch (action.type) {
    case constants.SET_MAP_CENTER: {
      return {
        ...state,
        mapCenter: action.payload
      };
    }
    case constants.SET_IS_DESKTOP_FILTERS_OPEN: {
      return {
        ...state,
        isDesktopFiltersOpen: action.payload
      };
    }
    case constants.SET_MAP_ZOOM: {
      return {
        ...state,
        mapZoom: action.payload
      };
    }
    case constants.SET_FEEDBACK_SUCCESS: {
      return {
        ...state,
        feedbackSuccess: action.payload
      };
    }
    case constants.OPEN_LOGIN_MODAL: {
      return {
        ...state,
        isLoginModal: true
      };
    }
    case constants.CLOSE_LOGIN_MODAL: {
      return {
        ...state,
        isLoginModal: false
      };
    }
    case constants.OPEN_CITY_MODAL: {
      return {
        ...state,
        isCityModal: true
      };
    }
    case constants.CLOSE_CITY_MODAL: {
      return {
        ...state,
        isCityModal: false
      };
    }
    case constants.OPEN_CALL_MODAL: {
      return {
        ...state,
        isCallModal: true
      };
    }
    case constants.CLOSE_CALL_MODAL: {
      return {
        ...state,
        isCallModal: false
      };
    }
    case constants.OPEN_FEEDBACK_MODAL: {
      return {
        ...state,
        isFeedbackModal: true
      };
    }
    case constants.CLOSE_FEEDBACK_MODAL: {
      return {
        ...state,
        isFeedbackModal: false
      };
    }
    case constants.OPEN_DRIVER_CONDITION_MODAL: {
      return {
        ...state,
        isDriverConditionsModal: true
      };
    }
    case constants.CLOSE_DRIVER_CONDITION_MODAL: {
      return {
        ...state,
        isDriverConditionsModal: false
      };
    }
    case constants.OPEN_DONT_ACCEPT_CALLS_MODAL: {
      return {
        ...state,
        isDontAcceptCallsModal: true
      };
    }
    case constants.CLOSE_DONT_ACCEPT_CALLS_MODAL: {
      return {
        ...state,
        isDontAcceptCallsModal: false
      };
    }
    case constants.SET_CITY: {
      return {
        ...state,
        city: action.payload
      };
    }
    case constants.SET_IS_MOBILE: {
      return {
        ...state,
        isMobile: action.payload
      };
    }
    case constants.SET_SUBSCRIBE_SUCCESS: {
      return {
        ...state,
        subscribeSuccess: true
      };
    }
    case constants.SELECTED_OFFERS_POINTS_ADDED: {
      return {
        ...state,
        selectedOffersPointsIds: action.payload
      };
    }
    case constants.CLEAN_SELECTED_OFFERS_POINTS: {
      return {
        ...state,
        selectedOffersPointsIds: []
      };
    }
    case constants.SET_OFFERS_PAGE: {
      return {
        ...state,
        offersPage: action.payload
      };
    }
    case constants.SET_IS_MAIN_PAGE: {
      return {
        ...state,
        isMainPage: action.payload
      };
    }
    default:
      return state;
  }
};
