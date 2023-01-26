export default {
  angry: {
    label: 'Очень плохо',
    number: 1,
    stars: 'one'
  },
  upset: {
    label: 'Плохо',
    number: 2,
    stars: 'two'
  },
  whatever: {
    label: 'Так себе',
    number: 3,
    stars: 'three'
  },
  smile: {
    label: 'Хорошо',
    number: 4,
    stars: 'four'
  },
  happy: {
    label: 'Отлично',
    number: 5,
    stars: 'five'
  }
};

export const feedbackOptions = [
  { id: 'driver_auth', name: 'Не могу войти как водитель' },
  { id: 'park_auth', name: 'Не могу войти как парк' },
  { id: 'cant_create_offer', name: 'Не получается разместить объявление' },
  { id: 'moderation', name: 'Почему мое объявление непринято' },
  { id: 'park_connect', name: 'Как связаться с парком' },
  { id: 'complain', name: 'Пожаловаться на объявление' },
  { id: 'other', name: 'Другое' }
];
