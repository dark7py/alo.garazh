import { urls } from '../configs';

export const getCarDetailsUrl = (userType) => {
  switch (userType) {
    case 'TAXIPARK': {
      return urls.carDetailsTaxipark;
    }
    case 'MODERATOR': {
      return urls.carDetailsModerator;
    }
    default: {
      return urls.carDetailsDriver;
    }
  }
};
