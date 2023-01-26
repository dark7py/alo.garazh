import React, { Component } from 'react';
import PropTypes from 'prop-types';

import PageContainer from 'components/PageContainer';
import Input from 'components/ui-kit/Input';
import InputPhone from 'components/ui-kit/Input/InputPhone';
import Textarea from 'components/ui-kit/Textarea';
import Select from 'components/ui-kit/Select';
import Button from 'components/ui-kit/Button';

import { feedbackOptions } from './config';
import { validEmail, validPhone } from './utils';

import './FeedbackPage.scss';

import Helmet from './Helmet';

const getCitiesOptions = (cities) => Object.keys(cities)
  .map((key) => ({ id: cities[key].code, name: cities[key].name }));

class FeedbackPage extends Component {
  constructor(props) {
    super(props);
    const { userName, userPhone, userEmail } = props.userInfo;
    this.state = {
      fio: userName,
      subject: 'driver_auth',
      email: userEmail || '',
      phone: userPhone || '',
      text: '',
      city: props.city || 'spb',
      error: {}
    };
  }

  onChangeInput = (id) => (event) => {
    const { error } = this.state;
    this.setState({ error: { ...error, [id]: undefined } });
    this.setState({ [id]: event.target.value });
  };

  onChangeTheme = (event) => this.setState({ subject: event.target.id });

  onChangeCity = (event) => this.setState({ city: event.target.id });

  onSubmit = (event) => {
    const {
      fio, email, phone, text
    } = this.state;
    event.preventDefault();
    const errorResult = {};

    if (fio.length <= 5) {
      errorResult.fio = true;
    }
    if (!validEmail(email)) {
      errorResult.email = true;
    }
    if (!validPhone(phone)) {
      errorResult.phone = true;
    }
    if (text.length <= 6) {
      errorResult.text = true;
    }

    this.setState({ error: errorResult }, () => this.submit());
  };

  submit = () => {
    const { feedback } = this.props;
    const { error } = this.state;
    if (Object.keys(error).length === 0) {
      const dataWithoutError = { ...this.state };
      delete dataWithoutError.error;
      feedback(JSON.stringify(dataWithoutError));
    }
  };

  render() {
    const {
      fio, subject, email, phone, text, city, error
    } = this.state;
    const { zones, feedbackSuccess } = this.props;
    const cityOptions = getCitiesOptions(zones);

    if (feedbackSuccess) {
      return (
        <PageContainer>
          <h1 className="feedback-page">
            Спасибо за сообщение, мы постараемся ответить Вам как можно скорее.
          </h1>
        </PageContainer>
      );
    }

    return (
      <>
        <Helmet />
        <PageContainer>
          <div className="feedback-page">
            <h1>Задайте вопрос</h1>
            <form
              action="#"
              className="feedback-page__form"
              onSubmit={this.onSubmit}
            >
              <div className="feedback-page__form-group">
                <span className="feedback-page__form-label">
                  Фамилия, имя, отчество:
                </span>
                <div
                  className={
                    error.fio ? 'feedback-page__form-input--error' : undefined
                  }
                >
                  <Input
                    value={fio}
                    onChange={this.onChangeInput('fio')}
                    placeholder=""
                  />
                  {
                    error.fio && (
                      <span className="feedback-page__form-error">
                        Недостаточно символов
                      </span>
                    )
                  }
                </div>
              </div>
              <div
                className="feedback-page__form-group
                feedback-page__form-group--select"
              >
                <span className="feedback-page__form-label">
                  Город:
                </span>
                <Select
                  value={city}
                  onChange={this.onChangeCity}
                  options={cityOptions}
                />
              </div>
              <div
                className="feedback-page__form-group
                feedback-page__form-group--select"
              >
                <span className="feedback-page__form-label">
                  Тема:
                </span>
                <Select
                  value={subject}
                  onChange={this.onChangeTheme}
                  options={feedbackOptions}
                />
              </div>
              <div className="feedback-page__form-group">
                <span className="feedback-page__form-label">
                  Email:
                </span>
                <div
                  className={
                    error.email ? 'feedback-page__form-input--error' : undefined
                  }
                >
                  <Input
                    value={email}
                    onChange={this.onChangeInput('email')}
                    placeholder=""
                  />
                  {
                    error.email && (
                      <span className="feedback-page__form-error">
                        Некорректная почта
                      </span>
                    )
                  }
                </div>
              </div>
              <div className="feedback-page__form-group">
                <span className="feedback-page__form-label">
                  Телефон:
                </span>
                <div
                  className={
                    error.phone ? 'feedback-page__form-input--error' : undefined
                  }
                >
                  <InputPhone
                    value={phone}
                    onChange={this.onChangeInput('phone')}
                  />
                  {
                    error.phone && (
                      <span className="feedback-page__form-error">
                        Некорректный телефон
                      </span>
                    )
                  }
                </div>
              </div>
              <div
                className="feedback-page__form-group
                feedback-page__form-group--wrap"
              >
                <span className="feedback-page__form-label">
                  Текст:
                </span>
                <div
                  className={
                    error.text ? 'feedback-page__form-input--error' : undefined
                  }
                >
                  <Textarea
                    value={text}
                    onChange={this.onChangeInput('text')}
                    placeholder=""
                  />
                  {
                    error.text && (
                      <span className="feedback-page__form-error">
                        Недостаточно символов
                      </span>
                    )
                  }
                </div>
              </div>
              <div className="feedback-page__form-btn">
                <Button type="submit">Отправить</Button>
              </div>
            </form>
          </div>
        </PageContainer>
      </>
    );
  }
}

FeedbackPage.propTypes = {
  userInfo: PropTypes.shape({
    userName: PropTypes.string,
    userPhone: PropTypes.string,
    userEmail: PropTypes.string,
    userType: PropTypes.string
  }).isRequired,
  feedback: PropTypes.func.isRequired,
  city: PropTypes.string.isRequired,
  zones: PropTypes.arrayOf(PropTypes.object),
  feedbackSuccess: PropTypes.bool.isRequired
};

FeedbackPage.defaultProps = {
  zones: []
};

export default FeedbackPage;
