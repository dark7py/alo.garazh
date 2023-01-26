import React from 'react';
import PropTypes from 'prop-types';

import Button from 'components/ui-kit/Button';

import './CallButton.scss';

const CallButton = (props) => {
  const {
    id, params, onClickCallButton, completedCallDate, userType
  } = props;
  const onClick = () => {
    if (['TAXIPARK', 'MODERATOR'].includes(userType)) {
      return;
    }

    onClickCallButton(id, params);
  };

  const callButtonTheme = completedCallDate ? 'white' : 'color';

  return (
    <Button onClick={onClick} theme={callButtonTheme}>
      Связаться
    </Button>
  );
};

CallButton.propTypes = {
  id: PropTypes.number.isRequired,
  params: PropTypes.oneOfType([
    PropTypes.shape({
      schedule_kind: PropTypes.string,
      commission: PropTypes.number,
      cost_per_day: PropTypes.number,
      deposit_amount: PropTypes.number,
      min_rental_period: PropTypes.number
    }),
    PropTypes.shape({
      schedule_kind: PropTypes.string,
      salary: PropTypes.string,
      deposit_amount: PropTypes.number
    })
  ]).isRequired,
  onClickCallButton: PropTypes.func.isRequired,
  completedCallDate: PropTypes.string,
  userType: PropTypes.string.isRequired
};

CallButton.defaultProps = {
  completedCallDate: null
};

export default CallButton;
