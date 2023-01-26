import React from 'react';
import './CarOffersEmpty.scss';

const CarOffersEmpty = () => (
  <div className="car-offers-empty">
    <div className="car-offers-empty__icon" />
    <div className="car-offers-empty__title">
      Нет подходящих объявлений
    </div>
    <div>
      Измените условия поиска или посмотрите похожие автомобили
    </div>
  </div>
);

export default CarOffersEmpty;
