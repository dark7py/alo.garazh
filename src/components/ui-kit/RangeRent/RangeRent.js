import React from 'react';
import PropTypes from 'prop-types';
import { Range } from 'rc-slider';
import 'rc-slider/assets/index.css';
import './RangeRent.scss';

const RangeRent = (props) => {
  const {
    min,
    max,
    priceMin,
    priceMax,
    onChange,
    step
  } = props;

  return (
    <div className="ui-kit-range-rent">
      <Range
        min={priceMin}
        max={priceMax}
        value={[+min, +max]}
        onChange={onChange}
        step={step}
        handle={(pr) => {
          const value = pr.value
            .toString()
            .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1 ');

          return (
            <div
              key={pr.index}
              className={pr.className}
              style={{ left: `${pr.offset}%` }}
            >
              <div className="rc-slider-tooltip-content">
                <div className="rc-slider-tooltip-inner">
                  {value}
                </div>
              </div>
            </div>
          );
        }}
      />
    </div>
  );
};

RangeRent.propTypes = {
  min: PropTypes.string.isRequired,
  max: PropTypes.string.isRequired,
  priceMin: PropTypes.number.isRequired,
  priceMax: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
  step: PropTypes.number.isRequired
};

export default RangeRent;
