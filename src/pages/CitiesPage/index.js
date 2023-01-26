import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import { lifecycle, compose } from 'recompose';

import { getCities } from 'modules/data/selectors';

import CitiesPage from './CitiesPage';

const mapStateToProps = createSelector(
  getCities,
  (cities) => ({
    cities
  })
);

const withConnect = connect(mapStateToProps, null);

const withLifecycle = lifecycle({
  componentDidMount() {
    // Сколим страницу на верх
    window.scrollTo({ top: 0 });
  }
});

const enhance = compose(
  withConnect,
  withLifecycle
);

export default enhance(CitiesPage);
