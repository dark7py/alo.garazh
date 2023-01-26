import { createSelector } from 'reselect';
import { branch, compose, renderNothing } from 'recompose';

import { connect } from 'react-redux';

import {
  getCityId,
  isMobileSelector
} from 'modules/ui/selectors';

import {
  getCityName,
  getPark
} from 'modules/data/selectors';

import {
  brandNameSelector,
  modelNameSelector
} from 'modules/filters/selectors';

import {
  openCityModal
} from 'modules/ui/actions';

import MainTitle from './MainTitle';

const mapStateToProps = createSelector(
  isMobileSelector,
  getCityId,
  getCityName,
  brandNameSelector,
  modelNameSelector,
  getPark,
  (
    isMobile,
    city,
    cityName,
    brandName,
    modelName,
    park
  ) => ({
    isMobile,
    city,
    cityName,
    brandName,
    modelName,
    park
  })
);

const withBranch = branch(
  ({ cityName }) => !cityName, renderNothing
);

const mapDispatchToProps = {
  openCityModal
};

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const enhance = compose(
  withConnect,
  withBranch
);

export default enhance(MainTitle);
