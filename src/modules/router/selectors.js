import { createSelector } from 'reselect';
import { getLocation } from 'connected-react-router';

import { getMatch } from 'routes';

export const getQuery = createSelector(
  getLocation,
  (location) => location.query
);

export const getUrlParams = createSelector(
  getLocation,
  (location) => {
    if (!location) {
      return {};
    }
    const match = getMatch(location.pathname);
    return match ? match.params : {};
  }
);

export const getIsMap = createSelector(
  getLocation,
  (location) => /^\/map/g.test(location.pathname)
);
