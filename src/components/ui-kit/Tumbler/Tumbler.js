import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classname from 'classnames';
import './Tumbler.scss';

class Tumbler extends PureComponent {
  tumblerClass = () => {
    const { isActive } = this.props;
    return classname({
      'ui-kit-tumbler': true,
      'ui-kit-tumbler--active': isActive
    });
  };

  render() {
    return (
      <button
        className={this.tumblerClass()}
        type="button"
      />
    );
  }
}

Tumbler.propTypes = {
  isActive: PropTypes.bool
};

Tumbler.defaultProps = {
  isActive: false
};

export default Tumbler;
