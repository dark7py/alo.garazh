import React from 'react';
import PropTypes from 'prop-types';
import { cityIn } from 'lvovich';

import PageContainer from 'components/PageContainer';

import Helmet from './Helmet';

import './ModelsPage.scss';

const ModelsPage = ({ cityId, cityName, carBrands }) => (
  <>
    <Helmet city={cityName} />
    <PageContainer>
      <div className="models-page">
        <h1>{`Все бренды и модели в ${cityIn(cityName)}`}</h1>
        <div>
          {
            carBrands
              .sort((a, b) => b.models.length - a.models.length)
              .map((brand) => {
                const brandCode = brand.code.toLowerCase();

                return (
                  <div key={brandCode}>
                    <div>
                      <a href={`/${cityId}/${brandCode}`}>
                        <h2>{brand.name}</h2>
                      </a>
                    </div>
                    <div key={brand.code} className="models-page__list">
                      {
                        brand.models.map((model) => (
                          <div key={model.code}>
                            <a
                              // eslint-disable-next-line max-len
                              href={`/${cityId}/${brandCode}/${model.code.toLowerCase()}`}
                            >
                              {model.name}
                            </a>
                          </div>
                        ))
                      }
                    </div>
                  </div>
                );
              })
          }
        </div>
      </div>
    </PageContainer>
  </>
);

ModelsPage.propTypes = {
  cityId: PropTypes.string.isRequired,
  cityName: PropTypes.string.isRequired,
  carBrands: PropTypes.arrayOf(PropTypes.object).isRequired
};

export default ModelsPage;
