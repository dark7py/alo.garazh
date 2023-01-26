import React from 'react';
import PropTypes from 'prop-types';

import { carPageAdditionallyList as additional } from 'pages/CarPage/blocks/CarMain/configs';
import './Additionally.scss';

import Subtitle from '../Subtitle';

const Additionally = (props) => {
  const { branded } = props;

  if (!branded) {
    return null;
  }

  return (
    <div className="car-main__additionally">
      <Subtitle>
        Дополнительно
      </Subtitle>
      {additional.map(({ code, name }) => {
        if (!props[code]) {
          return null;
        }

        return (
          <div
            key={code}
            className="car-main__additionally__item"
          >
            {name}
          </div>
        );
      })}
    </div>
  );
};

Additionally.propTypes = {
  branded: PropTypes.bool.isRequired
};

export default Additionally;
