import loadable from '@loadable/component';
import { matchPath } from 'react-router-dom';

import {
  prefetchMainPage,
  prefetchCarPage
} from 'modules/core/prefetchRoutesSaga';

export const ABOUT_PATH = '/about';

export const HELP_PATH = '/help';

export const FEEDBACK_PATH = '/feedback';

export const CITIES_PATH = '/cities';

export const HOME_PATH = '/:city?/:brand?/:model?';

export const CAR_PATH = '/:city/arenda_auto_:carId';

export const PARK_PATH = '/:city?/park_:park?/:brand?/:model?';

export const MODELS_PATH = '/:city/models';

export const MAP_PATH = '/map/:city?/:brand?/:model?';

export const routes = [
  {
    path: ABOUT_PATH,
    exact: true,
    component: loadable(() => import('./pages/AboutPage'))
  },
  {
    path: HELP_PATH,
    exact: true,
    component: loadable(() => import('./pages/HelpPage'))
  },
  {
    path: FEEDBACK_PATH,
    exact: true,
    component: loadable(() => import('./pages/FeedbackPage'))
  },
  {
    path: CITIES_PATH,
    exact: true,
    component: loadable(() => import('./pages/CitiesPage'))
  },
  {
    path: MAP_PATH,
    exact: true,
    component: loadable(() => import('./pages/MapPage'))
  },
  {
    path: MODELS_PATH,
    exact: true,
    component: loadable(() => import('./pages/ModelsPage'))
  },
  {
    path: CAR_PATH,
    exact: true,
    serverSideSaga: prefetchCarPage,
    component: loadable(() => import('./pages/CarPage'))
  },
  {
    path: PARK_PATH,
    exact: true,
    serverSideSaga: prefetchMainPage,
    component: loadable(() => import('./pages/MainPage'))
  },
  {
    path: HOME_PATH,
    exact: true,
    serverSideSaga: prefetchMainPage,
    component: loadable(() => import('./pages/MainPage'))
  }
];

export const getActiveRoute = (url) => (
  routes.find((route) => Boolean(matchPath(url, route)))
);

export const getMatch = (url) => {
  const findActiveRoute = ([route, ...rest]) => {
    if (route) {
      return matchPath(url, route) ?? findActiveRoute(rest);
    }
    return null;
  };
  return findActiveRoute(routes);
};

export default routes;
