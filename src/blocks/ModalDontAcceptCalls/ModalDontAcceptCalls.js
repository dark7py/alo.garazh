/* eslint-disable camelcase */
import React from 'react';
import PropTypes from 'prop-types';

import Modal from 'components/Modal';
import WorkTime from 'components/WorkTime';

import './ModalDontAcceptCalls.scss';

const ModalDontAcceptCalls = (props) => {
  const { closeDontAcceptCallsModal, companyNotWork } = props;

  const { weekdays, work_time, work_time_data } = companyNotWork;

  return (
    <Modal closeModal={closeDontAcceptCallsModal}>
      <div className="modal-dont-accept-calls">
        <div className="modal-dont-accept-calls__info">
          <h4>
            К сожалению, сейчас автор объявления не может ответить.
          </h4>
          <p>
            Но он увидит, что вы хотели связаться,
            и позвонит вам в рабочее время.
          </p>
        </div>
        <div className="modal-dont-accept-calls__work-time">
          <WorkTime
            workTime={work_time}
            workTimeData={work_time_data}
            weekdays={weekdays}
          />
        </div>
      </div>
    </Modal>
  );
};

ModalDontAcceptCalls.propTypes = {
  closeDontAcceptCallsModal: PropTypes.func.isRequired,
  companyNotWork: PropTypes.shape({
    work_time: PropTypes.shape({
      start_time: PropTypes.objectOf(PropTypes.string),
      end_time: PropTypes.objectOf(PropTypes.string)
    }),
    work_time_data: PropTypes.arrayOf(PropTypes.shape({
      value: PropTypes.string,
      start_time: PropTypes.objectOf(PropTypes.string),
      end_time: PropTypes.objectOf(PropTypes.string)
    })),
    weekdays: PropTypes.arrayOf(PropTypes.string)
  }).isRequired
};

export default ModalDontAcceptCalls;
