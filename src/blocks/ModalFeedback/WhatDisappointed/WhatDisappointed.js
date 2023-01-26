import React, { memo } from 'react';
import PropTypes from 'prop-types';

import CheckBox from 'components/ui-kit/CheckBox';

import './WhatDisappointed.scss';

const WhatDisappointed = ({ onChange, values, fosOptions }) => (
  <div className="what-disappointed">
    <div className="what-disappointed__title">
      Что вас разочаровало?
    </div>
    <div className="what-disappointed__checkboxes">
      {
        fosOptions.map((option) => {
          const handleOnChange = () => {
            onChange(option.code);
          };

          return (
            <CheckBox
              key={option.code}
              id={option.code}
              isChecked={values.includes(option.code)}
              onChange={handleOnChange}
            >
              {option.name}
            </CheckBox>
          );
        })
      }
    </div>
  </div>
);

WhatDisappointed.propTypes = {
  onChange: PropTypes.func.isRequired,
  values: PropTypes.arrayOf(PropTypes.object).isRequired,
  fosOptions: PropTypes.arrayOf(PropTypes.object).isRequired
};

export default memo(WhatDisappointed);
