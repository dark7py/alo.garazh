import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import './TumblerButton.scss';

import Tumbler from 'components/ui-kit/Tumbler';

const TumblerButton = ({
  id, isActive, onChange, ...otherProps
}) => {
  const onChangeHandler = useCallback(() => {
    onChange(id);
  }, [id, onChange]);

  return (
    <div
      className="mobile-tumbler-button"
      onClick={onChangeHandler}
      role="presentation"
    >
      <div>{otherProps.children}</div>
      <Tumbler isActive={isActive} />
    </div>
  );
};

TumblerButton.propTypes = {
  id: PropTypes.string.isRequired,
  isActive: PropTypes.bool,
  onChange: PropTypes.func.isRequired
};

TumblerButton.defaultProps = {
  isActive: false
};

export default TumblerButton;
