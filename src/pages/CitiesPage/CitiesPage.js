import React from 'react';
import PropTypes from 'prop-types';

import PageContainer from 'components/PageContainer';

import Helmet from './Helmet';

import './CitiesPage.scss';

const CitiesPage = ({ cities }) => (
  <>
    <Helmet />
    <PageContainer>
      <div className="cities-page">
        <h1>Все города</h1>
        <div className="cities-page__list">
          {
            cities
              .map((city) => {
                const { code, name } = city;
                return (
                  <div key={code}>
                    <a href={`/${code}`}>{name}</a>
                  </div>
                );
              })
          }
        </div>
      </div>
    </PageContainer>
  </>
);

CitiesPage.propTypes = {
  cities: PropTypes.arrayOf(PropTypes.object).isRequired
};

export default CitiesPage;
