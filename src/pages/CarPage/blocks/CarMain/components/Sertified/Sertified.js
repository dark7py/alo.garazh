import React from 'react';
import './Sertified.scss';

const Sertified = () => (
  <div className="car-main__image__sertificat">
    <img
      src="/images/question.svg"
      className="car-main__image-question"
      alt="question"
    />
    <div className="car-main__image__sertificat-info">
      <div className="car-main__image__sertificat-info__container">
        <span>Этот парк сертифицирован. </span>
        <a
          href="https://driver.yandex/certification/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Что это значит?
        </a>
      </div>
    </div>
  </div>
);

export default Sertified;
