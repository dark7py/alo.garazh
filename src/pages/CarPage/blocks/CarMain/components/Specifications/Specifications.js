import React from 'react';

import './Specifications.scss';

import { gearBoxTypes, fuelTypeTypes, tariffsTypes } from 'types/Car';
import Subtitle from '../Subtitle';


const Specifications = ({ gearBox, fuelType, tariffs }) => (
  <div className="car-main__specification">
    <Subtitle>
      Характеристики
    </Subtitle>
    <div className="car-main__specification__item">
      <span className="car-main__specification-key">
        Коробка
      </span>
      <span>
        {gearBox.name}
      </span>
    </div>
    <div className="car-main__specification__item">
      <span className="car-main__specification-key">
        Топливо
      </span>
      <span>
        {fuelType.name}
      </span>
    </div>
    <div className="car-main__specification__item">
      <span className="car-main__specification-key">
        Тарифы
      </span>
      <span>
        {
            tariffs
              .map((tariff) => tariff.name)
              .join(', ')
          }
      </span>
    </div>
  </div>
);

Specifications.propTypes = {
  gearBox: gearBoxTypes.isRequired,
  fuelType: fuelTypeTypes.isRequired,
  tariffs: tariffsTypes.isRequired
};

export default Specifications;
