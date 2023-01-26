import React from 'react';
import PropTypes from 'prop-types';

import Button from 'components/ui-kit/Button';
import './Header.scss';

const Header = ({ closeModal, save }) => {
  const onSave = () => {
    save();
    closeModal();
  };

  return (
    <div className="mobile-filter-header__container">
      <Button theme="white" onClick={closeModal}>
        <img
          className="mobile-filter-header__arrow"
          src="/images/icon-arrow-left.svg"
          alt="back"
        />
        Назад
      </Button>
      <Button theme="color" onClick={onSave}>
        Сохранить
      </Button>
    </div>
  );
};


Header.propTypes = {
  closeModal: PropTypes.func.isRequired,
  save: PropTypes.func.isRequired
};

export default Header;
