import unionWith from 'lodash.unionwith';
import isEqual from 'lodash.isequal';

import * as constants from './constants';

export const dataInitialState = {
  car: null,
  cars: null,
  noMoreCars: false,
  recommendedCars: null,
  park: null,
  parkCars: [],
  directories: {},
  offersPoints: []
};

export const dataReducer = (state = dataInitialState, action) => {
  switch (action.type) {
    case constants.SET_PARK: {
      return {
        ...state,
        park: action.payload
      };
    }
    case constants.PARK_FETCH_SUCCEEDED: {
      return {
        ...state,
        park: action.payload
      };
    }
    case constants.CARS_FETCH_SUCCEEDED: {
      return {
        ...state,
        // Проверяю нет ли уже таких машин в списке
        cars: state.cars
          ? unionWith([...state.cars, ...action.payload.items], isEqual)
          : action.payload.items,
        noMoreCars: action.payload.current_page >= action.payload.total_pages,
        recommendedCars: action.payload.recommendations
      };
    }
    case constants.CAR_FETCH_SUCCEEDED: {
      return {
        ...state,
        car: action.payload
      };
    }
    case constants.PARK_CARS_FETCH_SUCCEEDED: {
      return {
        ...state,
        parkCars: action.payload
      };
    }
    case constants.DIRECTORIES_FETCH_SUCCEEDED: {
      return {
        ...state,
        directories: {
          ...action.payload,
          car_brands: null
        }
      };
    }
    case constants.CARS_REMOVE: {
      return {
        ...state,
        cars: null,
        recommendedCars: null
      };
    }
    case constants.CAR_REMOVE: {
      return {
        ...state,
        car: null,
        parkCars: []
      };
    }
    case constants.BRANDS_FETCH_SUCCEEDED: {
      return {
        ...state,
        directories: {
          ...state.directories,
          car_brands: action.payload.items
        }
      };
    }
    case constants.OFFERS_POINTS_FETCH_SUCCEEDED: {
      return {
        ...state,
        offersPoints: action.payload
      };
    }
    default:
      return state;
  }
};
