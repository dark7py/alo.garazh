import { orderDays } from '../../../../../components/WorkTime/configs';

export const getWorkTimes = (workTime, weekdays) => {
  // eslint-disable-next-line camelcase
  const { start_time, end_time } = workTime;

  return orderDays
    .filter((day) => weekdays.includes(day))
    .map((key) => ({ value: key, start_time, end_time }));
};
