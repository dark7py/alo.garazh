import { cityIn } from 'lvovich';

import { ucFirst } from 'utils/ucFirst';

export const getDescription = (city, brand, model) => {
  const cityName = city ? cityIn(city) : 'России';

  if (brand) {
    const brandName = ucFirst(brand);
    const car = model ? `${brandName} ${ucFirst(model)}` : brandName;
    return (
      `Аренда ${car} для такси от проверенных партнеров `
      + `Яндекс.Такси в ${cityName}. `
      + 'Широкий выбор такси в аренду. Прозрачные условия'
    );
  }

  return (
    '«Яндекс.Гараж» — площадка для поиска объявлений '
    + `об аренде автомобилей в ${cityName} `
    + 'от проверенных партнёров Яндекс.Такси'
  );
};
