import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import { Link } from 'react-router-dom';
import classname from 'classnames';

import './InnerMenu.scss';

class InnerMenu extends PureComponent {
  linkClass = (id) => {
    const { active } = this.props;
    return classname(
      'inner-menu__link', {
        'inner-menu__link--active': active === id
      }
    );
  };

  render() {
    return (
      <div className="inner-menu">
        <Link to="/about" className={this.linkClass('about')}>О проекте</Link>
        <Link to="/help" className={this.linkClass('help')}>Помощь</Link>
      </div>
    );
  }
}

InnerMenu.propTypes = {
  active: PropTypes.string.isRequired
};

export default InnerMenu;
