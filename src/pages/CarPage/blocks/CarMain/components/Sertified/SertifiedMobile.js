import React, { PureComponent } from 'react';
import './SertifiedMobile.scss';

class SertifiedMobile extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      isOpen: false
    };
  }

  toggle = () => {
    this.setState((prevState) => ({ isOpen: !prevState.isOpen }));
  };

  render() {
    const { isOpen } = this.state;

    return (
      <>
        <button
          className="car-main__image__sertificat"
          onClick={this.toggle}
          type="button"
        >
          <img
            src="/images/question.svg"
            className="car-main__image-question"
            alt="question"
          />
        </button>
        {
          isOpen && (
            <div className="car-main__image__sertificat-info__mobile">
              <span>Этот парк сертифицирован. </span>
              <a
                href="https://driver.yandex/certification/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Что это значит?
              </a>
              <button
                className="car-main__image__sertificat__close"
                onClick={this.toggle}
                type="button"
              >
                <img
                  src="/images/icon-close.svg"
                  alt="close"
                />
              </button>
            </div>
          )
        }
      </>
    );
  }
}

export default SertifiedMobile;
