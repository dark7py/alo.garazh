import { declOfNum } from 'utils';

export const carPageRentTermsList = [
  {
    code: 'payoutSchedule',
    name: 'Выплаты',
    renderValue: (days) => `Раз в ${days} ${declOfNum(days, ['день', 'дня', 'дней'])}`
  },
  {
    code: 'minRentalPeriod',
    name: 'Срок аренды',
    renderValue: (days) => `от ${days} ${declOfNum(days, ['дня', 'дней', 'дней'])}`
  }
];
