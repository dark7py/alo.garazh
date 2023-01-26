import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

class ResetSMS extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      time: 0
    };
  }

  componentDidMount() {
    this.timer = setInterval(() => {
      this.setState(({ time }) => ({ time: time + 1 }));
    }, 1000);
  }

  componentDidUpdate() {
    const { time } = this.state;
    const { resetTime } = this.props;

    if (time >= resetTime) {
      clearInterval(this.timer);
    }
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  render() {
    const { time } = this.state;
    const { resetTime, getSms } = this.props;

    return (
      <div className="driver-login-form__reset-sms">
        {
          resetTime <= time ? (
            <button
              onClick={getSms}
              className="driver-login-form__reset"
              type="button"
            >
              Запросить SMS еще раз.
            </button>
          ) : (
            <div>
              {`Повторная отправка возможна через ${resetTime - time} секнуд`}
            </div>
          )
        }
      </div>
    );
  }
}

ResetSMS.propTypes = {
  getSms: PropTypes.func.isRequired,
  resetTime: PropTypes.number
};

ResetSMS.defaultProps = {
  resetTime: 120
};

export default ResetSMS;
