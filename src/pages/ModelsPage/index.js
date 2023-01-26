import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import {
  lifecycle,
  compose,
  branch,
  renderComponent
} from 'recompose';

import { getCityId } from 'modules/ui/selectors';
import { errorPageSelector } from 'modules/errors/selectors';

import { getCarBrands, getCityName } from 'modules/data/selectors';

import ModelsPage from './ModelsPage';
import Error from '../ErrorPage';

const mapStateToProps = createSelector(
  getCityId,
  getCityName,
  getCarBrands,
  errorPageSelector,
  (cityId, cityName, carBrands, error) => ({
    cityId,
    cityName,
    carBrands,
    error
  })
);

const withConnect = connect(mapStateToProps, null);

const withLifecycle = lifecycle({
  componentDidMount() {
    // Сколим страницу на верх
    window.scrollTo({ top: 0 });
  }
});

const withBranch = branch(({ error }) => error, renderComponent(Error));

const enhance = compose(
  withConnect,
  withLifecycle,
  withBranch
);

export default enhance(ModelsPage);
