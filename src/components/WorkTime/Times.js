import React from 'react';
import PropTypes from 'prop-types';

import { getTimeString } from 'pages/CarPage/blocks/CarMain/utils';

export const Times = ({ daysTimes }) => (
  <div>
    {
      daysTimes.map((workTimeItem) => {
        // eslint-disable-next-line camelcase
        const { value, start_time, end_time } = workTimeItem;
        const timeString = getTimeString(start_time, end_time);

        return (
          <div key={value}>{timeString}</div>
        );
      })
    }
  </div>
);

Times.propTypes = {
  daysTimes: PropTypes.arrayOf(PropTypes.shape({
    end_time: PropTypes.object,
    start_time: PropTypes.object,
    value: PropTypes.string
  })).isRequired
};

export default Times;
