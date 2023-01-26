import { cityIn } from 'lvovich';
import { ucFirst } from 'utils/ucFirst';

export const getTitle = (city, brand, model, park) => {
  const brandName = brand ? ucFirst(brand) : 'авто';
  const car = model ? `${brandName} ${ucFirst(model)}` : brandName;

  const mainCar = `Аренда ${car}`;

  const main = city ? `${mainCar} в ${cityIn(city)}` : mainCar;

  return park ? `${main}. Парк ${park.name} - Яндекс.Гараж` : `${main} - Яндекс.Гараж`;
};
