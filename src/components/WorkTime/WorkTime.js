import React from 'react';
import PropTypes from 'prop-types';

import { Days } from './Days';
import { Times } from './Times';

import { getWorkTimes } from '../../pages/CarPage/blocks/CarMain/utils';

import './WorkTime.scss';

const WorkTime = ({ workTime, workTimeData, weekdays }) => {
  if (!workTime && !workTimeData) {
    return null;
  }

  const daysTimes = workTimeData || getWorkTimes(workTime, weekdays);

  return (
    <div className="car-main__work-time__list">
      <div className="car-main__work-time">
        <div className="car-main__work-time__title">
          График работы парка:
        </div>
        <div className="car-main__work-time__list">
          <Days daysTimes={daysTimes} />
          <Times daysTimes={daysTimes} />
        </div>
      </div>
    </div>
  );
};

WorkTime.propTypes = {
  workTime: PropTypes.shape({
    start_time: PropTypes.objectOf(PropTypes.string),
    end_time: PropTypes.objectOf(PropTypes.string)
  }),
  workTimeData: PropTypes.arrayOf(PropTypes.shape({
    value: PropTypes.string,
    start_time: PropTypes.objectOf(PropTypes.string),
    end_time: PropTypes.objectOf(PropTypes.string)
  })),
  weekdays: PropTypes.arrayOf(PropTypes.string)
};

WorkTime.defaultProps = {
  workTime: null,
  workTimeData: null,
  weekdays: []
};

export default WorkTime;
