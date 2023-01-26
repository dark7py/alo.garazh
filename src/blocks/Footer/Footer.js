import React from 'react';
import PropTypes from 'prop-types';

import { Link } from 'react-router-dom';
import './Footer.scss';

const Footer = ({ footerZones, carBrands, cityId }) => {
  if (!footerZones) {
    return null;
  }

  const showModels = carBrands && !!carBrands.length;
  const year = new Date().getFullYear();

  return (
    <footer>
      <div className="cities_wrapper">
        <div className="cities">
          <a href="/cities">
            <p>Выберите свой город</p>
          </a>
          <ul>
            {
              footerZones.map((zone) => (
                <li key={zone.code}>
                  <a href={`/${zone.code}`}>
                    {zone.name}
                  </a>
                </li>
              ))
            }
          </ul>
        </div>
      </div>
      <div className="wrap">
        <div className="flex">
          <div className="link">
            <Link to="/about">О проекте</Link>
            <Link to="/help">Помощь</Link>
            { showModels
              && <Link to={`/${cityId}/models`}>Все бренды и модели</Link>}
            <a
              href="https://parks.taxi.yandex.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Все партнеры
            </a>
          </div>
          <p className="copyright">
            {`© 2019 - ${year} ООО «Яндекс.Такси»`}
          </p>
        </div>
      </div>
    </footer>
  );
};

Footer.propTypes = {
  footerZones: PropTypes.arrayOf(
    PropTypes.shape({
      code: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired
    })
  ).isRequired,
  carBrands: PropTypes.arrayOf(PropTypes.object),
  cityId: PropTypes.string.isRequired
};

Footer.defaultProps = {
  carBrands: []
};

export default Footer;
