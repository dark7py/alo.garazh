import { connect } from 'react-redux';
import { createSelector } from 'reselect';

import { getCityName } from 'modules/data/selectors';

import { setCity } from 'modules/ui/actions';

import CityModal from './CityModal';

const mapStateToProps = createSelector(
  getCityName,
  (cityName) => ({ cityName })
);

const mapDispatchToProps = {
  setCity
};

const withConnect = connect(mapStateToProps, mapDispatchToProps);


export default withConnect(CityModal);
