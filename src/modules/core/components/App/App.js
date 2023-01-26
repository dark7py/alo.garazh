/* eslint react/prop-types: 0 */
import React, { useEffect } from 'react';
import { renderRoutes } from 'react-router-config';
import PropTypes from 'prop-types';

import Header from 'blocks/Header';
import Footer from 'blocks/Footer';

import ModalDriverLogin from 'blocks/ModalDriverLogin';
import ModalCall from 'blocks/ModalCall';
import ModalFeedback from 'blocks/ModalFeedback';
import ModalDriverConditions from 'blocks/ModalDriverConditions';
import ModalCitySelect from 'blocks/ModalCitySelect';
import ModalError from 'blocks/ModalError';
import ModalDontAcceptCalls from 'blocks/ModalDontAcceptCalls';

import { routes } from 'routes';
import './App.scss';

const App = (props) => {
  const { isMobile, isMobileBrowser, setIsMobile } = props;

  useEffect(() => {
    // Проверка, мобильное устройство или нет по разрешению
    if (isMobile !== isMobileBrowser) {
      setIsMobile(isMobileBrowser);
    }
  }, []);

  return (
    <div className="app__main">
      <Header />
      {renderRoutes(routes)}
      <ModalDriverLogin />
      <ModalDriverConditions />
      <ModalCall />
      <ModalFeedback />
      <ModalCitySelect />
      <ModalError />
      <ModalDontAcceptCalls />
      <Footer />
    </div>
  );
};

App.propTypes = {
  isMobile: PropTypes.bool.isRequired,
  setIsMobile: PropTypes.func.isRequired,
  isMobileBrowser: PropTypes.bool
};

App.defaultProps = {
  isMobileBrowser: false
};

export default App;
