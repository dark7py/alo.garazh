import { compose, branch, renderComponent } from 'recompose';
import { createSelector } from 'reselect';
import { connect } from 'react-redux';

import { getNoMoreCars } from 'modules/data/selectors';

import { sortingSelector } from 'modules/filters/selectors';
import { changeSorting } from 'modules/filters/actions';

import Loader from 'components/Loader';
import CarOffersEmpty from 'components/CarOffersEmpty';

import CarOffers from './CarOffers';

const mapStateToProps = createSelector(
  sortingSelector,
  getNoMoreCars,
  (sorting, noMoreCars) => ({ sorting, noMoreCars })
);

const mapDispatchToProps = {
  changeSorting
};

const withBranch = compose(
  branch(({ cars }) => !cars, renderComponent(Loader)),
  branch(({ cars }) => cars.length === 0, renderComponent(CarOffersEmpty))
);

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const enhance = compose(
  withConnect,
  withBranch
);

export default enhance(CarOffers);
