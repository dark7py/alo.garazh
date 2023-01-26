export const queryToURL = (query) => Object.keys(query)
  .sort()
  .filter((key) => {
    if (!query[key]) {
      // отфильтровать пустые значения
      return false;
    }

    // отфильтровать пустые массивы
    return !Array.isArray(query[key]) || query[key].length;
  })
  .reduce((acc, key, i) => {
    const filter = query[key];

    // Если это не пустой массив
    if (Array.isArray(filter)) {
      if (filter.length) {
        return i === 0
          ? `${key}=${filter.sort().join(',')}`
          : `${acc}&${key}=${filter.sort().join(',')}`;
      }

      return acc;
    }

    if (filter) {
      // Если просто значение
      return i === 0
        ? `${key}=${filter}`
        : `${acc}&${key}=${filter}`;
    }

    return acc;
  }, '');
