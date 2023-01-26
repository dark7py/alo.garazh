import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './Accordion.scss';
import AccordionSection from './AccordionSection';

class Accordion extends Component {
  constructor(props) {
    super(props);

    const openSections = {};
    const { children } = this.props;

    children.forEach((child) => {
      if (child.props.isOpen) {
        openSections[child.props.label] = true;
      }
    });

    this.state = { openSections };
  }

  onClick = (label) => {
    const {
      props: { allowMultipleOpen },
      state: { openSections }
    } = this;

    const isOpen = !!openSections[label];

    if (allowMultipleOpen) {
      this.setState({
        openSections: {
          ...openSections,
          [label]: !isOpen
        }
      });
    } else {
      this.setState({
        openSections: {
          [label]: !isOpen
        }
      });
    }
  };

  render() {
    const {
      onClick,
      props: { children },
      state: { openSections }
    } = this;

    return (
      <div className="accordion">
        {children.map((child) => (
          <AccordionSection
            isOpen={!!openSections[child.props.label]}
            label={child.props.label}
            onClick={onClick}
            key={child.props.label}
          >
            {child.props.children}
          </AccordionSection>
        ))}
      </div>
    );
  }
}

Accordion.propTypes = {
  allowMultipleOpen: PropTypes.bool,
  children: PropTypes.instanceOf(Object).isRequired
};

Accordion.defaultProps = {
  allowMultipleOpen: false
};

export default Accordion;
