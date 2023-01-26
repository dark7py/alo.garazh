import { createSelector } from 'reselect';
import sortBy from 'lodash.sortby';
import shuffle from 'lodash.shuffle';

import { getCityId } from 'modules/ui/selectors';

export const getData = (state) => state.data;

export const getCars = createSelector(
  getData,
  (data) => data.cars
);

export const getPark = createSelector(
  getData,
  (data) => data.park
);

export const getTotalCarsPages = createSelector(
  getData,
  (data) => data.totalCarsPages
);

export const getTotalCarsItems = createSelector(
  getData,
  (data) => data.totalCarsItems
);

export const getNoMoreCars = createSelector(
  getData,
  (data) => data.noMoreCars
);

export const getRecommendedCars = createSelector(
  getData,
  (data) => data.recommendedCars
);

export const getParkCars = createSelector(
  getData,
  (data) => data.parkCars
);

export const getCar = createSelector(
  getData,
  (data) => data.car
);

export const getOffersPoints = createSelector(
  getData,
  (data) => data.offersPoints
);

export const getDirectories = createSelector(
  getData,
  (data) => data.directories
);

export const getAllZones = createSelector(
  getDirectories,
  (directories) => directories && directories.all_zones
);

export const getFooterZones = createSelector(
  getDirectories,
  (directories) => {
    if (directories) {
      return directories.footer_zones;
    }

    return [];
  }
);

export const getCities = createSelector(
  getDirectories,
  (directories) => directories && directories.all_zones
    && directories.all_zones.filter((zone) => directories.zones_selection.includes(zone.code))
);

export const getCitiesDirection = createSelector(
  getCities,
  (cities) => cities && cities.reduce((acc, item) => {
    acc[item.code] = item;
    return acc;
  }, {})
);

export const getAllZonesDirection = createSelector(
  getAllZones,
  (zones) => zones && zones.reduce((acc, item) => {
    acc[item.code] = item;
    return acc;
  }, {})
);

export const getCityName = createSelector(
  getCityId,
  getCitiesDirection,
  (cityId, cities) => {
    if (cities) {
      return cities[cityId] && cities[cityId].name;
    }

    return null;
  }
);

export const getCityCoordinates = createSelector(
  getCityId,
  getCitiesDirection,
  (cityId, cities) => {
    if (!cities || !cities[cityId]) {
      return null;
    }

    const { latitude, longitude } = cities[cityId];

    return { latitude, longitude };
  }
);

export const getCitiesOptions = createSelector(
  getCities, (cities) => {
    if (cities) {
      return sortBy(cities, (o) => o.name)
        .map((city) => ({
          value: city.code,
          label: city.name
        }));
    }

    return [];
  }
);

export const getZonesSelection = createSelector(
  getDirectories,
  (directories) => directories && directories.zones_selection
);

export const getDefaultZone = createSelector(
  getDirectories,
  (directories) => directories && directories.default_zone
);

export const getCarBrands = createSelector(
  getDirectories,
  (directories) => directories.car_brands
);

export const getCarBrandsDirectory = createSelector(
  getCarBrands,
  (brands) => brands && brands.reduce((acc, item) => {
    acc[item.code.toLowerCase()] = item;
    return acc;
  }, {})
);

export const getFosOptions = createSelector(
  getDirectories,
  (directories) => {
    const other = directories.calls_feedback_reasons.find((item) => item.code === 'other');
    const options = shuffle(directories.calls_feedback_reasons)
      .filter((item) => item.code !== 'other');

    return [...options, other];
  }
);

export const getSmsCodeLength = createSelector(
  getDirectories,
  (directories) => directories.sms_code_length
);
