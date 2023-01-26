import { createSelector } from 'reselect';

export const getUI = (store) => store.ui;

export const getCityId = createSelector(
  getUI,
  (ui) => ui.city
);

export const isLoginModalSelector = createSelector(
  getUI,
  (ui) => ui.isLoginModal
);

export const isCallModalSelector = createSelector(
  getUI,
  (ui) => ui.isCallModal
);

export const isCityModalSelector = createSelector(
  getUI,
  (ui) => ui.isCityModal
);

export const isFeedbackModalSelector = createSelector(
  getUI,
  (ui) => ui.isFeedbackModal
);

export const isDriverConditionsModalSelector = createSelector(
  getUI,
  (ui) => ui.isDriverConditionsModal
);

export const isDontAcceptCallsModalSelector = createSelector(
  getUI,
  (ui) => ui.isDontAcceptCallsModal
);

export const isMobileSelector = createSelector(
  getUI,
  (ui) => ui.isMobile
);

export const offersPageSelector = createSelector(
  getUI,
  (ui) => ui.offersPage
);

export const subscribeSuccessSelector = createSelector(
  getUI,
  (ui) => ui.subscribeSuccess
);

export const feedbackSuccessSelector = createSelector(
  getUI,
  (ui) => ui.feedbackSuccess
);

export const selectedOffersPointsIdsSelector = createSelector(
  getUI,
  (ui) => ui.selectedOffersPointsIds
);

export const isTaxiparkDraftSelector = createSelector(
  getUI,
  (ui) => ui.isTaxiparkDraft
);

export const mapCenterSelector = createSelector(
  getUI,
  (ui) => ui.mapCenter
);

export const mapZoomSelector = createSelector(
  getUI,
  (ui) => ui.mapZoom
);

export const isMainPageSelector = createSelector(
  getUI,
  (ui) => ui.isMainPage
);

export const isDesktopFiltersOpenSelector = createSelector(
  getUI,
  (ui) => ui.isDesktopFiltersOpen
);
