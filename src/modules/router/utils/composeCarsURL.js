/*
 * joins array items to a single pathname string.
 * if an item is a falsy value, this item and all
 * subsequent items are dropped from the resulting pathname.
 *
 * example:
 * joinPath(['foo', 'bar', null, 'baz']) will return '/foo/bar'
 */
const joinPath = ([head, ...tail], acc = []) => (
  head ? joinPath(tail, [...acc, head]) : acc.join('/')
);

export const composeCarsURL = ({
  host = '',
  city,
  brand,
  model,
  park,
  search = '',
  isMap
}) => {
  const carPath = park ? [city, `park_${park}`, brand, model] : [city, brand, model];
  const path = joinPath(isMap ? ['map', ...carPath] : carPath);

  return `${host}/${path}${search}`;
};
