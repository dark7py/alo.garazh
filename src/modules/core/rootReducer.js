import { combineReducers } from 'redux';

import { uiReducer } from 'modules/ui';
import { userReducer } from 'modules/user';
import { routerReducer } from 'modules/router';
import { dataReducer } from 'modules/data';
import { errorsReducer } from 'modules/errors';
import { callReducer } from 'modules/call';


export const createRootReducer = (history) => combineReducers({
  ui: uiReducer,
  user: userReducer,
  call: callReducer,
  data: dataReducer,
  errors: errorsReducer,
  router: routerReducer(history)
});
