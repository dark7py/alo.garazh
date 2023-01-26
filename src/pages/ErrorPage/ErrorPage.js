import React from 'react';
import PropTypes from 'prop-types';

import Button from 'components/ui-kit/Button';

import Helmet from './Helmet';

import './ErrorPage.scss';

const ErrorPage = ({ error, title }) => (
  <>
    <Helmet />
    <div className="error-page__container">
      {<h2 className="error-page__title">{title || error}</h2>}
      {title && <p className="error-page__error">{error}</p>}
      <div className="error-page__button-container">
        <a href="/">
          <Button>
            Вернуться к списку объявлений
          </Button>
        </a>
      </div>
    </div>
  </>
);

ErrorPage.propTypes = {
  error: PropTypes.string,
  title: PropTypes.string
};

ErrorPage.defaultProps = {
  error: '',
  title: ''
};

export default ErrorPage;
