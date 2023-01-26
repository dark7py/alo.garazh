import createSagaMiddleware, { END } from 'redux-saga';
import { createStore as createReduxStore, applyMiddleware } from 'redux';

import { routerMiddleware } from 'connected-react-router';
import { createRootReducer } from 'modules/core/rootReducer';

export const createStore = (history, preloadedState = {}) => {
  const sagaMiddleware = createSagaMiddleware();
  const router = routerMiddleware(history);

  const middlewares = [sagaMiddleware, router];

  if (process.env.NODE_ENV === 'development') {
    // eslint-disable-next-line global-require
    const { createLogger } = require('redux-logger');
    const logger = createLogger({
      collapsed: true
    });

    middlewares.push(logger);
  }

  const enhancer = applyMiddleware(...middlewares);

  const rootReducer = createRootReducer(history);
  const store = createReduxStore(rootReducer, preloadedState, enhancer);
  store.runSaga = sagaMiddleware.run;
  store.closeSagas = () => store.dispatch(END);

  return store;
};
