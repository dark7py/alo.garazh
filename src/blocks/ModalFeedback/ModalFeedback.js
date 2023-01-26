import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import xor from 'lodash.xor';

import Modal from 'components/Modal';
import Button from 'components/ui-kit/Button';

import Assessment from './Assessment';
import WhatDisappointed from './WhatDisappointed';

import './ModalFeedback.scss';

import feedback from './config';

class ModalFeedback extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      assessment: null,
      whatDisappointed: [],
      reasonMessage: ''
    };
  }

  onClickAssessment = (assessment) => {
    this.setState({ assessment });
  };

  onChangeDisappointed = (value) => {
    this.setState(({ whatDisappointed }) => ({
      // Если такое значение есть, убрать его если нет добавить
      whatDisappointed: xor(whatDisappointed, [value])
    }));
  };

  onChangeReasonMessage = (e) => {
    this.setState({ reasonMessage: e.target.value });
  };

  onSubmit = () => {
    const { callId, sessionId, sendFeedback } = this.props;
    const { whatDisappointed, reasonMessage, assessment } = this.state;

    const body = {
      reason_codes: whatDisappointed,
      reason_message: reasonMessage,
      stars: feedback[assessment].stars,
      call_session_id: sessionId
    };

    sendFeedback(callId, JSON.stringify(body));
  };

  onClose = () => {
    const { closeModal } = this.props;

    closeModal();
  };

  render() {
    const { assessment, whatDisappointed } = this.state;
    const { closeModal, feedbackSuccess } = this.props;

    const notSuccess = assessment
      ? feedback[assessment].label
      : 'Как прошёл разговор?';

    const title = feedbackSuccess
      ? 'Спасибо! Мы получили ваше сообщение' : notSuccess;

    const isBadFeedback = assessment && feedback[assessment].number < 4;
    const isDisappointed = !!whatDisappointed.length;

    return (
      <Modal closeModal={closeModal}>
        <div className="feedback">
          <div className="feedback__title">
            {title}
          </div>
          {
            !feedbackSuccess && (
              <>
                <Assessment
                  imgUrl="/images/feedback"
                  assessment={assessment}
                  onClick={this.onClickAssessment}
                />
                {isBadFeedback && (
                  <WhatDisappointed
                    onChange={this.onChangeDisappointed}
                    values={whatDisappointed}
                  />
                )}
                {isDisappointed && (
                  <textarea
                    className="feedback__textarea"
                    onChange={this.onChangeReasonMessage}
                  />
                )}
                <Button
                  onClick={assessment ? this.onSubmit : this.onClose}
                  theme="white"
                >
                  {assessment ? 'Отправить' : 'Закрыть'}
                </Button>
              </>
            )
          }
        </div>
      </Modal>
    );
  }
}

ModalFeedback.propTypes = {
  callId: PropTypes.number.isRequired,
  sessionId: PropTypes.number.isRequired,
  closeModal: PropTypes.func.isRequired,
  sendFeedback: PropTypes.func.isRequired,
  feedbackSuccess: PropTypes.bool.isRequired
};

export default ModalFeedback;
