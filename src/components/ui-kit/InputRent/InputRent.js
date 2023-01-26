import React, { PureComponent } from 'react';
import isEqual from 'lodash.isequal';
import PropTypes from 'prop-types';
import './InputRent.scss';

class InputRent extends PureComponent {
  onChangeInput = (event) => {
    // Ограничичваем кол-во символов
    if (event.target.value.length > 15) {
      return;
    }

    const { min, max, onChange } = this.props;

    const values = { min, max };

    // Забираем только числовые значения
    values[event.target.id] = parseInt(
      event.target.value.replace(/[^\d]*$/, ''),
      10
    );

    // Есле значения отличаются
    if (!isEqual(values, { min, max })) {
      onChange(values);
    }
  };

  render() {
    const { min, max } = this.props;

    return (
      <div className="ui-kit-input-rent">
        <input
          id="min"
          type="text"
          value={min}
          onChange={this.onChangeInput}
          className="min"
          placeholder="от"
        />
        <input
          id="max"
          type="text"
          value={max}
          onChange={this.onChangeInput}
          className="max"
          placeholder="до"
        />
      </div>
    );
  }
}

InputRent.propTypes = {
  min: PropTypes.string.isRequired,
  max: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired
};

export default InputRent;
