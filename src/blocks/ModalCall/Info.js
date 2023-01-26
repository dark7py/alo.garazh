import React from 'react';
import PropTypes from 'prop-types';

const Info = ({ isActive, userPhone }) => (
  <div className="call-modal__info">
    <div className="call-modal__title">
      {`Ожидайте звонок на ваш номер +${userPhone}`}
    </div>
    <div className="call-modal__phone">
      {
        isActive ? 'Устанавливаем соединение с парком' : 'Не удалось связаться'
      }
    </div>
  </div>
);

Info.propTypes = {
  isActive: PropTypes.bool,
  userPhone: PropTypes.string
};

Info.defaultProps = {
  isActive: true,
  userPhone: null
};

export default Info;
