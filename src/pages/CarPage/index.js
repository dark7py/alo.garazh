import { connect } from 'react-redux';
import {
  branch,
  compose,
  lifecycle,
  renderComponent
} from 'recompose';
import { createSelector } from 'reselect';

import Loader from 'components/Loader';

import {
  getCar,
  getParkCars,
  getAllZones
} from 'modules/data/selectors';
import { getUserInfo } from 'modules/user/selectors';
import { isMobileSelector } from 'modules/ui/selectors';

import { errorPageSelector } from 'modules/errors/selectors';
import {
  getCar as getCarAction,
  getParkCars as getParkCarsAction,
  removeCar
} from 'modules/data/actions';

import ErrorPage from '../ErrorPage';
import CarPage from './CarPage';

const withLifecycle = lifecycle({
  componentDidMount() {
    const {
      car,
      match,
      fetchCar,
      error
    } = this.props;

    const carId = parseInt(match.params.carId, 10);

    if (!error && !car) {
      fetchCar(carId);
    }
  },
  componentDidUpdate() {
    const {
      car,
      match,
      fetchCar,
      error
    } = this.props;

    const carId = parseInt(match.params.carId, 10);

    if (!error && car && car.id !== carId) {
      fetchCar(match.params.carId);
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    }
  },
  componentWillUnmount() {
    this.props.removeCar();
  }
});

const mapStateToProps = createSelector(
  getCar,
  getParkCars,
  getUserInfo,
  errorPageSelector,
  getAllZones,
  isMobileSelector,
  (
    car,
    parkCars,
    user,
    error,
    allZones,
    isMobile
  ) => ({
    car,
    parkCars,
    user,
    error,
    allZones,
    isMobile
  })
);

const mapDispatchToProps = {
  fetchCar: getCarAction,
  fetchParkCars: getParkCarsAction,
  removeCar
};

const withBranch = compose(
  branch(({ error }) => error, renderComponent(ErrorPage)),
  branch(({ car }) => !car, renderComponent(Loader))
);

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const enhance = compose(
  withConnect,
  withLifecycle,
  withBranch
);

export default enhance(CarPage);
