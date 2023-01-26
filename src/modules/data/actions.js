import * as constants from './constants';

export const getDirectories = () => ({
  type: constants.DIRECTORIES_FETCH_REQUESTED,
  payload: {}
});

export const directoriesRequestSucceeded = (directories) => ({
  type: constants.DIRECTORIES_FETCH_SUCCEEDED,
  payload: directories
});

export const directoriesRequestFailed = (error) => ({
  type: constants.DIRECTORIES_FETCH_FAILED,
  payload: error
});

export const getCars = (page) => ({
  type: constants.CARS_FETCH_REQUESTED,
  payload: page
});

export const carsRequestSucceeded = (cars) => ({
  type: constants.CARS_FETCH_SUCCEEDED,
  payload: cars
});

export const carsRequestFailed = (error) => ({
  type: constants.CARS_FETCH_FAILED,
  payload: error
});

export const getCar = (id) => ({
  type: constants.CAR_FETCH_REQUESTED,
  payload: id
});

export const carRequestSucceeded = (car) => ({
  type: constants.CAR_FETCH_SUCCEEDED,
  payload: car
});

export const carRequestFailed = (error) => ({
  type: constants.CAR_FETCH_FAILED,
  payload: error
});

export const getParkCars = (parkId) => ({
  type: constants.PARK_CARS_FETCH_REQUESTED,
  payload: parkId
});

export const parkCarsRequestSucceeded = (cars) => ({
  type: constants.PARK_CARS_FETCH_SUCCEEDED,
  payload: cars
});

export const parkCarsRequestFailed = (error) => ({
  type: constants.PARK_CARS_FETCH_FAILED,
  payload: error
});

export const removeCars = () => ({
  type: constants.CARS_REMOVE
});

export const removeCar = () => ({
  type: constants.CAR_REMOVE
});

export const getBrands = (page) => ({
  type: constants.BRANDS_FETCH_REQUESTED,
  payload: page
});

export const brandsRequestSucceeded = (brands) => ({
  type: constants.BRANDS_FETCH_SUCCEEDED,
  payload: brands
});

export const brandsRequestFailed = (error) => ({
  type: constants.BRANDS_FETCH_FAILED,
  payload: error
});

export const getOffersPoints = () => ({
  type: constants.OFFERS_POINTS_FETCH_REQUESTED
});

export const offersPointsRequestSucceeded = (cars) => ({
  type: constants.OFFERS_POINTS_FETCH_SUCCEEDED,
  payload: cars
});

export const offersPointsRequestFailed = (error) => ({
  type: constants.OFFERS_POINTS_FETCH_FAILURE,
  payload: error
});

export const setPark = (parkOption) => ({
  type: constants.SET_PARK,
  payload: parkOption && {
    slug: parkOption.value,
    name: parkOption.label
  }
});

export const getParkBySlug = (parkId) => ({
  type: constants.PARK_FETCH_REQUESTED,
  payload: parkId
});

export const parkBySlugRequestSucceeded = (park) => ({
  type: constants.PARK_FETCH_SUCCEEDED,
  payload: park
});

export const parkBySlugRequestFailed = (error) => ({
  type: constants.PARK_FETCH_FAILED,
  payload: error
});
