import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import { withRouter } from 'react-router-dom';

import {
  brandNameSelector,
  modelNameSelector
} from 'modules/filters/selectors';

import { getCitiesOptions } from 'modules/data/selectors';

import SelectCity from './SelectCity';

const mapStateToProps = createSelector(
  brandNameSelector,
  modelNameSelector,
  getCitiesOptions,
  (
    brandName,
    modelName,
    citiesOptions
  ) => ({
    brandName,
    modelName,
    citiesOptions
  })
);

const mapDispatchToProps = null;

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default withRouter(withConnect(SelectCity));
