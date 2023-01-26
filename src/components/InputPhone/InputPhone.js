import React from 'react';
import PropTypes from 'prop-types';

import classnames from 'classnames';
import TextMask from 'react-text-mask';

import './InputPhone.scss';

const InputPhone = (props) => {
  const { errorMessage, isError, ...otherProps } = props;
  const inputClassName = classnames({
    'input-text': true,
    'input-text--error': isError
  });

  return (
    <div>
      <TextMask
        className={inputClassName}
        /* eslint-disable-next-line max-len */
        mask={['+', '7', ' ', '(', /\d/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, ' ', /\d/, /\d/, ' ', /\d/, /\d/]}
        placeholder="+7 (___) ___ ___ __"
        guide={false}
        /* eslint-disable-next-line react/jsx-props-no-spreading */
        {...otherProps}
      />
      <div className="create__error-message">
        {isError && errorMessage}
      </div>
    </div>
  );
};

InputPhone.propTypes = {
  errorMessage: PropTypes.string,
  isError: PropTypes.bool
};

InputPhone.defaultProps = {
  errorMessage: '',
  isError: false
};

export default InputPhone;
