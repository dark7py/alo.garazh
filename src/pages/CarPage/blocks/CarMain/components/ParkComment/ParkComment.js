import React from 'react';
import PropTypes from 'prop-types';

import './ParkComment.scss';
import Subtitle from '../Subtitle';

const ParkComment = ({ additionalInfo }) => {
  if (!additionalInfo) {
    return null;
  }

  return (
    <div className="car-main__park-comment">
      <Subtitle>
        Комментарий парка
      </Subtitle>
      <div>
        {additionalInfo}
      </div>
    </div>
  );
};

ParkComment.propTypes = {
  additionalInfo: PropTypes.string
};

ParkComment.defaultProps = {
  additionalInfo: ''
};

export default ParkComment;
