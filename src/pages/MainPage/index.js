import { connect } from 'react-redux';
import {
  branch,
  compose,
  lifecycle,
  renderComponent
} from 'recompose';

import { createSelector } from 'reselect';
import { withRouter } from 'react-router';

import {
  getCars as getCarsSelector,
  getRecommendedCars,
  getCityName,
  getPark
} from 'modules/data/selectors';

import { errorPageSelector } from 'modules/errors/selectors';

import { getCars, removeCars } from 'modules/data/actions';
import { setCity, setIsMainPage } from 'modules/ui/actions';
import {
  brandNameSelector,
  modelNameSelector,
  filtersSelector,
  mainPageCanonicalURLSelector
} from 'modules/filters/selectors';

import Error from 'pages/ErrorPage';

import MainPage from './MainPage';

const withLifecycle = lifecycle({
  componentDidMount() {
    const {
      cars,
      location,
      fetchCars
    } = this.props;

    this.props.setIsMainPage(true);

    if (!cars) {
      fetchCars();
    }

    // Скрол к элементы с котрого пришли
    if (location.state) {
      const item = document.getElementById(location.state);

      if (item) {
        item.scrollIntoView({ block: 'center' });
      }
    }
  },
  componentDidUpdate(prevProps) {
    const { cars, fetchCars } = this.props;
    if (prevProps.cars && !cars) {
      fetchCars();
    }
  },
  componentWillUnmount() {
    this.props.setIsMainPage(false);
  }
});

const mapStateToProps = createSelector(
  getCarsSelector,
  getRecommendedCars,
  getCityName,
  errorPageSelector,
  brandNameSelector,
  modelNameSelector,
  getPark,
  filtersSelector,
  mainPageCanonicalURLSelector,
  (
    cars,
    recommendedCars,
    city,
    error,
    brandName,
    modelName,
    park,
    filters,
    canonicalURL
  ) => ({
    cars,
    recommendedCars,
    city,
    error,
    brandName,
    modelName,
    park,
    filters,
    canonicalURL
  })
);

const mapDispatchToProps = {
  fetchCars: getCars,
  removeCars,
  setCity,
  setIsMainPage
};

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withBranch = branch(({ error }) => error, renderComponent(Error));

const enhance = compose(
  withConnect,
  withLifecycle,
  withBranch,
  withRouter
);

export default enhance(MainPage);
