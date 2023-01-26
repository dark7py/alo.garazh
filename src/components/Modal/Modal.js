import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import ClickOutside from 'components/ClickOutside';
import './Modal.scss';

class Modal extends PureComponent {
  // Отключаем скрол пока открыто модальное окно
  body = document.getElementsByTagName('body')[0];

  componentDidMount() {
    this.body.style.overflow = 'hidden';
  }

  componentWillUnmount() {
    this.body.style.overflow = 'auto';
  }

  render() {
    const { closeModal, children } = this.props;

    return (
      <div className="modal__wrapper">
        <ClickOutside onClickOutside={closeModal}>
          <div className="modal__container">
            <button
              type="button"
              className="modal__close"
              onClick={closeModal}
            />
            {children}
          </div>
        </ClickOutside>
      </div>
    );
  }
}

Modal.propTypes = {
  closeModal: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired
};

export default Modal;
