import sortBy from 'lodash.sortby';

const isCityInZones = (zones) => (
  (city) => (zones ? zones.includes(city.code) : true)
);

const cityToOption = (city) => ({ value: city.code, label: city.name });

export const getCitiesOptions = (cities, zones) => {
  const options = cities.filter(isCityInZones(zones)).map(cityToOption);

  return sortBy(options, ((o) => o.label));
};
