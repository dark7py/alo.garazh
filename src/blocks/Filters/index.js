import { connect } from 'react-redux';
import { createSelector } from 'reselect';

import {
  setDailyRent,
  changeFiltersList,
  changeConditions,
  changeTumbler,
  changeIncluded,
  clearFilters,
  changeNoDeposit,
  changeCommission,
  changeSelfEmployed,
  changeSorting,
  changeBrand,
  changeModel,
  save
} from 'modules/filters/actions';

import { setIsDesktopFiltersOpen } from 'modules/ui/actions';

import { isMobileSelector, isDesktopFiltersOpenSelector } from 'modules/ui/selectors';

import {
  dailyRentSelector,
  filtersListSelector,
  conditionsSelector,
  includedSelector,
  noDepositSelector,
  sortingSelector,
  noCommissionSelector,
  brandOptionSelector,
  modelOptionSelector,
  isEmptyFiltersSelector,
  carModelsOptionsSelector,
  carBrandsOptionsSelector,
  selfEmployedSelector
} from 'modules/filters/selectors';

import { getPark } from 'modules/data/selectors';

import Filters from './Filters';

const mapStateToProps = createSelector(
  isMobileSelector,
  dailyRentSelector,
  filtersListSelector,
  conditionsSelector,
  includedSelector,
  noDepositSelector,
  sortingSelector,
  noCommissionSelector,
  carBrandsOptionsSelector,
  carModelsOptionsSelector,
  isEmptyFiltersSelector,
  brandOptionSelector,
  modelOptionSelector,
  selfEmployedSelector,
  getPark,
  isDesktopFiltersOpenSelector,
  (
    isMobile,
    dailyRent,
    filtersList,
    conditions,
    included,
    noDeposit,
    sorting,
    noCommission,
    carBrandsOptions,
    carModelsOptions,
    isEmptyFilters,
    brand,
    model,
    selfEmployed,
    park,
    isDesktopFiltersOpen
  ) => ({
    isMobile,
    dailyRent,
    filtersList,
    conditions,
    included,
    noDeposit,
    sorting,
    noCommission,
    carBrandsOptions,
    carModelsOptions,
    isEmptyFilters,
    brand,
    model,
    selfEmployed,
    park,
    isDesktopFiltersOpen
  })
);

const mapDispatchToProps = {
  setDailyRent,
  changeFiltersList,
  changeConditions,
  changeCommission,
  changeSelfEmployed,
  changeTumbler,
  changeIncluded,
  clearFilters,
  changeNoDeposit,
  changeSorting,
  changeBrand,
  changeModel,
  save,
  setIsDesktopFiltersOpen
};

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default withConnect(Filters);
