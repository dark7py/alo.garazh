import PropTypes from 'prop-types';

export const fuelTypeTypes = PropTypes.oneOfType([
  PropTypes.exact({
    code: PropTypes.oneOf(['benzine']),
    name: PropTypes.oneOf(['Бензин'])
  }),
  PropTypes.exact({
    code: PropTypes.oneOf(['diesel']),
    name: PropTypes.oneOf(['Дизель'])
  }),
  PropTypes.exact({
    code: PropTypes.oneOf(['gas']),
    name: PropTypes.oneOf(['Газ'])
  })
]);

export const gearBoxTypes = PropTypes.oneOfType([
  PropTypes.exact({
    code: PropTypes.oneOf(['automatic']),
    name: PropTypes.oneOf(['Автомат'])
  }),
  PropTypes.exact({
    code: PropTypes.oneOf(['manual']),
    name: PropTypes.oneOf(['Механика'])
  })
]);

export const tariffsTypes = PropTypes.arrayOf(
  PropTypes.shape({
    code: PropTypes.string,
    name: PropTypes.string
  })
);

export const photosType = PropTypes.arrayOf(
  PropTypes.exact({
    id: PropTypes.number.isRequired,
    url: PropTypes.string.isRequired,
    resolutions: PropTypes.arrayOf(
      PropTypes.exact({
        size: PropTypes.string.isRequired,
        url: PropTypes.string.isRequired
      })
    ).isRequired
  })
);

const scheduleTypes = PropTypes.arrayOf(
  PropTypes.oneOf([
    'six_days_per_week',
    'seven_days_per_week',
    'twelve_hours',
    'salary'
  ])
);

export const CarType = {
  /** айди объявления */
  id: PropTypes.number.isRequired,

  /** ссылка на главное фото машины */
  img: PropTypes.string,

  /** фотографии машины */
  photos: photosType,

  /** название компании */
  companyName: PropTypes.string,

  /** айди компании */
  companyId: PropTypes.number,

  /** комментарий парка по машине */
  additionalInfo: PropTypes.string,

  /** айди адреса в базе данного объявления */
  addressId: PropTypes.number,

  /** количество звонков по обяъвлению */
  callsCount: PropTypes.number,

  /** бренд машины */
  carBrand: PropTypes.shape({
    code: PropTypes.string,
    name: PropTypes.string
  }),

  /** модель машины */
  carModel: PropTypes.shape({
    code: PropTypes.string,
    name: PropTypes.string
  }),

  /** год выпуска машины */
  year: PropTypes.number,

  /** вид топлива */
  fuelType: fuelTypeTypes,

  /** тип коробки */
  gearBox: gearBoxTypes,

  /** список объектов */
  tariffs: tariffsTypes,

  /** Оплачивает ли парк топливо */
  carFuel: PropTypes.bool,

  /** Ремонт тачки за счет парка */
  carRepair: PropTypes.bool,

  /** Есть ли ТО за счет парка */
  carService: PropTypes.bool,

  /** Парк принимает самозанятых */
  selfEmployedPark: PropTypes.bool,

  /** Брендированная ли машина */
  branded: PropTypes.bool,

  /** желтые номера */
  yellowNumbers: PropTypes.bool,

  /** сертифицирован ли парк */
  certifiedPark: PropTypes.bool,

  /** Возможность выкупа автомобиля */
  canBuyCar: PropTypes.bool,

  /**  Предоставляет ли парк услугу Предрейсовый осмотр */
  pretripInspection: PropTypes.bool,

  /**  Парк предоставляет телефон на время работы */
  providesPhone: PropTypes.bool,

  /**  Парк осуществляет поддержку 24/7 */
  techSupport: PropTypes.bool,

  /** мойка за счет парка */
  carWash: PropTypes.bool,

  /** есть ли страховка */
  insuranceCasco: PropTypes.bool,

  /** Есть ли сезонная замена шин */
  seasonalTireReplacement: PropTypes.bool,

  /** есть ли акция на машину */
  promo_1day: PropTypes.bool,

  /** Размер комиссии парка за аренду машины */
  commission: PropTypes.number,

  /** Минимальный срок аренды */
  min_rental_period: PropTypes.number,

  /** График */
  schedule: scheduleTypes,

  /**
   * Цвет машины
   * @deprecated будет только у старых объявлений
   */
  color: PropTypes.shape({
    name: PropTypes.string
  }),

  /** @deprecated телефон брать из `phone` */
  companyPhone: PropTypes.string,

  /**
   * Номер телефона парка для связи
   */
  phone: PropTypes.string,

  /** дата последнего звонка по объявлению в UTC */
  completedCallDate: PropTypes.string,

  /** время последнего звонка в парк разместивший объявление в UTC */
  completedParkZoneCallDate: PropTypes.string,

  /** Цена аренды в день */
  dailyRent: PropTypes.number,

  /** Сумма депозита */
  depositCost: PropTypes.number,

  /**
   * Нужен ли депозит
   * @deprecated проверять `depositCost` > 0
   */
  needDeposit: PropTypes.bool,

  /** Количество фидбэков по данному объявлению */
  feedbackCount: PropTypes.number,

  /** Можно оставлять фидбэк после успешного звонка */
  feedback_enabled: PropTypes.bool,

  /** есть ли сессия звонка */
  hasCallSession: PropTypes.bool,

  /** есть успешный звонок */
  hasCompletedCall: PropTypes.bool,

  /** дата последнего фидбэка в UTC */
  lastFeedbackDate: PropTypes.string,

  /**
   * предоставляется ли лицензия(?)
   * @deprecated
   */
  licensed: PropTypes.bool,

  /** metro цвет в HEX */
  metro: PropTypes.shape({
    station: PropTypes.string,
    color: PropTypes.string
  }),

  /** айди модератора */
  moderatorId: PropTypes.number,

  /** причина отклонения объявления */
  rejectReason: PropTypes.string,

  /** статус объявления */
  state: PropTypes.string,

  /**
   * бонусы от парка
   * @deprecated использовать булевые поля
   * `carFuel`
   * `carRepair`
   * `carService`
   * `carWash`
   * `insuranceCasco`
   * `seasonalTireReplacement`
   */
  tags: PropTypes.arrayOf(
    PropTypes.string
  ),

  /** количество просмотров данного объявления */
  viewedCount: PropTypes.number,

  /** Зона машины */
  zone_name: PropTypes.string
};
