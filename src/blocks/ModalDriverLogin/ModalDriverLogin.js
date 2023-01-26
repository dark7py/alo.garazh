import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import Button from 'components/ui-kit/Button';
import InputPhone from 'components/InputPhone';
import Modal from 'components/Modal';

import { parsePhone } from 'utils';

import ResetSMS from './ResetSMS';
import LoginButton from './LoginButton';

import './ModalDriverLogin.scss';

class ModalDriverLogin extends PureComponent {
  formRef = React.createRef();

  constructor(props) {
    super(props);

    this.state = {
      phone: '',
      smsCode: ''
    };
  }

  onSubmit = (e) => {
    const { getLoginSms, city } = this.props;

    e.preventDefault();

    const body = new FormData(this.formRef.current);
    body.append('zone_name', city || 'spb');

    getLoginSms(body);
  };

  checkSms = () => {
    const { login, city } = this.props;

    const { phone } = this.state;
    const formattedPhone = parsePhone(phone);
    const body = new FormData(this.formRef.current);
    body.append('zone_name', city || 'spb');
    body.append('phone', formattedPhone);

    login(formattedPhone, body);
  };

  getSMS = () => {
    const { getLoginSms, city } = this.props;
    const { phone } = this.state;

    this.setState({ smsCode: '' });

    const body = new FormData();
    body.append('phone', phone);
    body.append('zone_name', city || 'spb');

    getLoginSms(body);
  };

  onSmsCodeChange = (e) => {
    const { value } = e.target;
    const { error, resetError, smsCodeLength } = this.props;

    if (value.length > smsCodeLength) {
      return;
    }

    if (error) {
      resetError();
    }

    this.setState({ smsCode: value });

    if (value.length === smsCodeLength) {
      this.checkSms();
    }
  };

  onPhoneChange = (e) => {
    const { value } = e.target;
    const { error, resetError } = this.props;

    if (error) {
      resetError();
    }

    this.setState({ phone: value });
  };

  renderPhoneInput = () => {
    const { phone } = this.state;

    return (
      <div>
        <InputPhone
          id="phone"
          value={phone}
          name="phone"
          hint="adfa"
          onChange={this.onPhoneChange}
        />
        <span className="driver-login-form__text">
          Номер телефона понадобится для соединения с таксопарком
        </span>
      </div>
    );
  };

  renderSmsInput = () => {
    const { smsCode, phone } = this.state;

    return (
      <div>
        <div className="driver-login-form__text">
          Код подтверждения отправлен на телефон
          <div>{phone}</div>
        </div>
        <input
          value={smsCode}
          id="sms_code"
          name="sms_code"
          className="driver-login-form__input"
          placeholder="Введите СМС"
          onChange={this.onSmsCodeChange}
        />
        <ResetSMS getSms={this.getSMS} />
        <button
          onClick={this.reset}
          className="driver-login-form__reset"
          type="button"
        >
          Ввести другой номер телефона
        </button>
      </div>
    );
  };

  renderError = () => {
    const { error } = this.props;

    if (!error) {
      return null;
    }

    return (
      <div
        className="driver-login-form__error"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: error }}
      />
    );
  };

  reset = () => {
    const { reset } = this.props;
    this.setState({ smsCode: '' });

    reset();
  };

  render() {
    const {
      isProcessing,
      closeLoginModal,
      isSmsRequested
    } = this.props;

    const taxiParkLink = window.ENV.REACT_APP_YA_LINK_TAXIPARK_LOGIN
      || 'https://lk.taximeter.yandex.ru/marketplace';

    return (
      <Modal closeModal={closeLoginModal}>
        <form
          ref={this.formRef}
          className="driver-login-form"
        >
          <h1 className="driver-login-form__title">
            Вход
          </h1>
          <div className="driver-login-form__input-container">
            {
              isSmsRequested
                ? this.renderSmsInput()
                : this.renderPhoneInput()
            }
            { this.renderError() }
          </div>
          {
            !isSmsRequested && (
              <LoginButton
                isProcessing={isProcessing}
                onClick={this.onSubmit}
              />
            )
          }
          <div className="driver-login-form__taxopark">
            <a href={taxiParkLink}>
              <Button theme="white">
                Вход для таксопарка
              </Button>
            </a>
          </div>
        </form>
      </Modal>
    );
  }
}

ModalDriverLogin.propTypes = {
  getLoginSms: PropTypes.func.isRequired,
  login: PropTypes.func.isRequired,
  reset: PropTypes.func.isRequired,
  resetError: PropTypes.func.isRequired,
  closeLoginModal: PropTypes.func.isRequired,
  city: PropTypes.string.isRequired,
  error: PropTypes.string,
  isProcessing: PropTypes.bool,
  isSmsRequested: PropTypes.bool,
  smsCodeLength: PropTypes.number
};

ModalDriverLogin.defaultProps = {
  error: null,
  isProcessing: false,
  isSmsRequested: false,
  smsCodeLength: 6
};

export default ModalDriverLogin;
