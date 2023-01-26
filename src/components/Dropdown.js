import React from 'react';
import PropTypes from 'prop-types';

import withToggle from 'HOC/withToggle';
import ClickOutside from './ClickOutside';

const Dropdown = (props) => {
  const {
    renderHandler, renderContent, toggledOn,
    toggle, show, hide
  } = props;

  return (
    <ClickOutside onClickOutside={hide}>
      <div>
        {renderHandler({
          hide,
          show,
          toggle,
          toggledOn
        })}
        {toggledOn
        && renderContent({
          hide,
          show,
          toggle,
          toggledOn
        })}
      </div>
    </ClickOutside>
  );
};

Dropdown.propTypes = {
  hide: PropTypes.func.isRequired,
  renderContent: PropTypes.func.isRequired,
  renderHandler: PropTypes.func.isRequired,
  show: PropTypes.func.isRequired,
  toggle: PropTypes.func.isRequired,
  toggledOn: PropTypes.bool.isRequired
};

export default withToggle(Dropdown);
