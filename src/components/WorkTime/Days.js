import React from 'react';
import PropTypes from 'prop-types';

import { days } from './configs';

export const Days = ({ daysTimes }) => (
  <div>
    {
      daysTimes.map(({ value }) => (
        <div key={value}>{`${days[value]}: `}</div>
      ))
    }
  </div>
);

Days.propTypes = {
  daysTimes: PropTypes.arrayOf(PropTypes.object).isRequired
};

export default Days;
