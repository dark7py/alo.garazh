import { cityIn } from 'lvovich';

export const getImageAltText = (carOffer, cityName) => {
  const { carBrand, carModel, year } = carOffer;

  // eslint-disable-next-line max-len
  return `Аренда ${carBrand.name} ${carModel.name} ${year} в ${cityIn(cityName)}`;
};
