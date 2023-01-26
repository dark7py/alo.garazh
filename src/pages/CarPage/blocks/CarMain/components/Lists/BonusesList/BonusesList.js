import React from 'react';
import { carPageBonusesList } from 'pages/CarPage/blocks/CarMain/configs';

import Subtitle from '../../Subtitle';
import List from '../List';
import Item from '../Item';

const BonusesList = (props) => {
  const bonuses = Object.keys(carPageBonusesList)
    .map((key) => props[key])
    .filter((item) => item);

  if (!bonuses.length) {
    return null;
  }

  return (
    <div className="car-bonuses-list">
      <Subtitle>
        Бонусы
      </Subtitle>
      <List>
        {Object.entries(carPageBonusesList)
          .map(([key, value]) => {
            if (!props[key]) {
              return null;
            }

            return (
              <Item key={key} alignChild="top">
                <img
                  className="car-main__feature-img"
                  src={value.imgSrc}
                  alt={value.imgAlt}
                />
                <div>
                  <div>{value.title}</div>
                  <div className="car-main__feature-element_light">
                    {value.description}
                  </div>
                </div>
              </Item>
            );
          })}
      </List>
    </div>
  );
};

BonusesList.defaultProps = {
  carRepair: false,
  carService: false,
  seasonalTireReplacement: false,
  medic: false,
  carWash: false
};

export default BonusesList;
