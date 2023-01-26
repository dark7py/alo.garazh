import React from 'react';
import PropTypes from 'prop-types';

import './Logo.scss';

const Logo = ({ city }) => (
  <div>
    <a href={`/${city}`}>
      <img
        className="logo"
        src="/images/yandex_logo_beta.svg"
        alt="Яндекс Гараж"
      />
    </a>
  </div>
);

Logo.propTypes = {
  city: PropTypes.string.isRequired
};

export default Logo;
