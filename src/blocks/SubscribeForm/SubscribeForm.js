import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classname from 'classnames';

import Input from 'components/ui-kit/Input';
import Button from 'components/ui-kit/Button';
import CheckBox from 'components/ui-kit/CheckBox';

import { validEmail } from 'utils';

import './SubscribeForm.scss';

class SubscribeForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      confirm: false,
      email: '',
      error: false
    };
  }

  changeConfirm = () => {
    this.setState((prevState) => ({ confirm: !prevState.confirm }));
  };

  changeEmail = (event) => {
    this.setState({ email: event.target.value, error: false });
  };

  success = () => {
    const { subscribe, filters } = this.props;

    const { email } = this.state;
    if (validEmail(email)) {
      subscribe(JSON.stringify({
        email,
        search_parameters: filters
      }));
    } else {
      this.setState({ error: true });
    }
  };

  inputClasses = () => {
    const { error } = this.state;
    return classname(
      'subscribe-form__input',
      {
        'subscribe-form__input--error': error
      }
    );
  };

  render() {
    const { confirm, email, error } = this.state;
    const { subscribeSuccess } = this.props;

    return (
      <div className="subscribe-form">
        {
          subscribeSuccess ? (
            <div className="subscribe-form__title--subscribed">
              <div className="icon" />
              Подписка успешно оформлена.
            </div>
          ) : (
            <>
              <h2 className="subscribe-form__title">
                Мы пришлем вам интересные предложения по вашим предпочтениям
              </h2>
              <form className="subscribe-form__form" action="#">
                <div className="subscribe-form__row">
                  <div className={this.inputClasses()}>
                    {
                      error && (
                        <span className="subscribe-form__error">
                          Некоректная почта
                        </span>
                      )
                    }
                    <Input
                      value={email}
                      onChange={this.changeEmail}
                      placeholder="Введите email"
                    />
                  </div>
                  <div className="subscribe-form__btn">
                    <Button disabled={!confirm} onClick={this.success}>
                      Подписаться
                    </Button>
                  </div>
                </div>
                <CheckBox
                  id="confirm"
                  onChange={this.changeConfirm}
                  isChecked={confirm}
                >
                  Согласен получать рассылку новых предложений по аренде авто
                </CheckBox>
              </form>
            </>
          )
        }
      </div>
    );
  }
}

SubscribeForm.propTypes = {
  subscribe: PropTypes.func.isRequired,
  subscribeSuccess: PropTypes.bool,
  filters: PropTypes.objectOf(PropTypes.node).isRequired
};

SubscribeForm.defaultProps = {
  subscribeSuccess: false
};

export default SubscribeForm;
