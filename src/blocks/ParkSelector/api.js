import { fetchJSON } from 'utils';
import { parkSuggestsUrl } from './configs';

export const fetchParkSuggests = async (terms, zone) => {
  const response = await fetchJSON(`${parkSuggestsUrl}?term=${terms}&zone_name=${zone}`)
    .then((res) => res.payload.items);

  return response;
};
