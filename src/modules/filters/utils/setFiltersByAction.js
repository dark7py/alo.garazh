import xor from 'lodash.xor';
import * as actions from '../constants';

export const setFiltersByAction = (query, action) => {
  const { payload, type } = action;

  switch (type) {
    case actions.SET_DAILY_RENT: {
      const { min, max } = payload;
      return {
        ...query,
        daily_rent_min: min,
        daily_rent_max: max
      };
    }
    case actions.CHANGE_SEARCH_STRING: {
      return {
        ...query,
        search_string: payload
      };
    }
    case actions.CHANGE_FILTERS_LIST: {
      const values = query[payload.id]
        ? query[payload.id].split(',')
        : [];

      return {
        ...query,
        [payload.id]:
          xor(values, [payload.value])
      };
    }
    case actions.CHANGE_CONDITIONS: {
      const condition = query.conditions
        ? query.conditions.split(',')
        : [];

      return {
        ...query,
        conditions: xor(condition, [payload])
      };
    }
    case actions.CHANGE_INCLUDED: {
      const included = query.included
        ? query.included.split(',')
        : [];

      return {
        ...query,
        included: xor(included, [payload])
      };
    }
    case actions.CHANGE_CERTIFIED: {
      return {
        ...query,
        certified: !query.certified ? 1 : 0
      };
    }
    case actions.CHANGE_NO_DEPOSIT: {
      return {
        ...query,
        no_deposit: !query.no_deposit
      };
    }
    case actions.CHANGE_BRAND: {
      return {
        ...query,
        car_brand_id: payload,
        car_model_id: null
      };
    }
    case actions.CHANGE_MODEL: {
      return {
        ...query,
        car_model_id: payload
      };
    }
    case actions.CHANGE_COMMISSION: {
      return {
        ...query,
        no_commission: !query.no_commission
      };
    }
    case actions.CHANGE_SELF_EMPLOYED: {
      return {
        ...query,
        self_employed: !query.self_employed
      };
    }
    case actions.CHANGE_SORTING: {
      const id = payload;
      if (id === 'default') {
        return {
          ...query,
          order_by: null,
          order_direction: null
        };
      }

      // eslint-disable-next-line camelcase
      const [order_by, order_direction] = id.split('_');
      return {
        ...query,
        order_by,
        order_direction
      };
    }
    case actions.CLEAR_FILTERS: {
      return ({});
    }
    default: return query;
  }
};
