import React from 'react';
import PropTypes from 'prop-types';
import { getDateCall } from 'utils';

import './BackCall.scss';

const BackCall = ({ completedCallDate }) => {
  if (!completedCallDate) {
    return null;
  }

  return (
    <>
      <span className="car-main__back-call-title">
        Был звонок
      </span>
      <span className="car-main__back-call-date">
        {getDateCall(completedCallDate)}
      </span>
    </>
  );
};

BackCall.propTypes = {
  completedCallDate: PropTypes.string
};

BackCall.defaultProps = {
  completedCallDate: ''
};

export default BackCall;
