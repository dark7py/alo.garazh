import React from 'react';
import PropTypes from 'prop-types';
import { carPageParkList } from 'pages/CarPage/blocks/CarMain/configs';

import Subtitle from '../../Subtitle';
import List from '../List';
import Item from '../Item';
import Sertified from '../../Sertified';

const ParkList = ({ companyName, ...rest }) => (
  <div className="car-park-list">
    <Subtitle>
      Парк
    </Subtitle>
    <List>
      <Item>
        <img
          className="car-main__feature-img"
          src="/images/icon-cab.svg"
          alt="taxi cab"
        />
        {companyName}
      </Item>
      {Object.entries(carPageParkList)
        .map(([key, value]) => {
          if (!rest[key]) {
            return null;
          }

          return (
            <Item key={key}>
              <img
                className="car-main__feature-img"
                src={value.imgSrc}
                alt={value.imgAlt}
              />
              {value.children}
              {
                  key === 'certifiedPark' && (
                    <Sertified />
                  )
                }
              {
                  key === 'companyRating'
                    && `${rest.companyRating} из 10 баллов`
                }
            </Item>
          );
        })}
    </List>
  </div>
);

ParkList.propTypes = {
  companyName: PropTypes.string,
  certifiedPark: PropTypes.bool,
  canBuyCar: PropTypes.bool,
  companyRating: PropTypes.number
};

ParkList.defaultProps = {
  certifiedPark: false,
  canBuyCar: false,
  companyRating: null,
  companyName: ''
};

export default ParkList;
