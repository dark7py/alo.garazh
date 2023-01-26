import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import { compose, branch, renderNothing } from 'recompose';
import { withRouter } from 'react-router-dom';

import { closeCityModal, setCity } from 'modules/ui/actions';

import { getCityId, isCityModalSelector } from 'modules/ui/selectors';

import { getAllZones, getZonesSelection, getCityName } from 'modules/data/selectors';

import ModalCitySelect from './ModalCitySelect';

const mapStateToProps = createSelector(
  isCityModalSelector,
  getCityName,
  getCityId,
  getAllZones,
  getZonesSelection,
  (
    isCityModal,
    cityName,
    city,
    zones,
    zonesSelection
  ) => ({
    isCityModal,
    cityName,
    city,
    zones,
    zonesSelection
  })
);

const mapDispatchToProps = {
  setCity,
  closeCityModal
};

const withBranch = branch(({ isCityModal }) => !isCityModal, renderNothing);

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const enhance = compose(
  withConnect,
  withBranch,
  withRouter
);

export default enhance(ModalCitySelect);
