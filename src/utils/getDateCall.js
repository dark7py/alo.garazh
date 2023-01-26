import { DateTime } from 'luxon';

export const getDateCall = (callDate) => {
  const now = DateTime.local();
  const date = DateTime.fromISO(callDate, { zone: 'utc' }).toLocal();

  if (now.day === date.day) {
    return `Сегодня в ${date.toFormat('HH:mm')}`;
  }

  if (now.day - 1 === date.day) {
    return 'Вчера';
  }

  return date.toISODate();
};
