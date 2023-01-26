import { fetchJSON } from 'utils';
import { carsSearchSuggestsUrl } from './configs';

export const fetchSearchSuggests = async (terms) => {
  const response = await fetchJSON(`${carsSearchSuggestsUrl}?term=${terms}`)
    .then((res) => res.payload.items);

  return response;
};
