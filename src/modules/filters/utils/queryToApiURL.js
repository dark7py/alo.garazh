export const queryToApiURL = (query) => Object.keys(query).reduce((acc, key) => {
  const filter = query[key];

  // Формируем фильтр для API
  if (filter) {
    if (Array.isArray(filter)) {
      return `${acc}&${key}=${filter.join(`&${key}=`)}`;
    }

    return `${acc}&${key}=${filter.split(',').join(`&${key}=`)}`;
  }

  return acc;
}, '');
