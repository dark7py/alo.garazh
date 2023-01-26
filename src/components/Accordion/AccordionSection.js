import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

class AccordionSection extends Component {
  onClick = () => {
    const { onClick, label } = this.props;
    onClick(label);
  };

  labelClasses = () => {
    const { isOpen } = this.props;
    return classnames(
      'accordion__label',
      {
        'accordion__label--active': isOpen
      }
    );
  }

  render() {
    const {
      onClick,
      props: { isOpen, label, children }
    } = this;

    return (
      <div className="accordion__section">
        <div
          onClick={onClick}
          role="presentation"
          className={this.labelClasses()}
        >
          {label}
        </div>
        {isOpen && (
          <div className="accordion__content">
            {children}
          </div>
        )}
      </div>
    );
  }
}

AccordionSection.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  label: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func.isRequired
};

export default AccordionSection;
