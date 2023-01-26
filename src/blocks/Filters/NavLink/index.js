import { connect } from 'react-redux';
import { compose } from 'recompose';

import { getIsMap } from 'modules/router/selectors';
import {
  mainPageURLSelector,
  mapPageURLSelector
} from 'modules/filters/selectors';

import NavLink from './NavLink';

const mapStateToProps = (state, { isLinkToMap }) => {
  const url = (
    isLinkToMap
      ? mapPageURLSelector(state)
      : mainPageURLSelector(state)
  );

  const isMap = getIsMap(state);
  const isActive = () => Boolean(isLinkToMap) === isMap;

  return { isActive, url };
};

const mapDispatchToProps = null;

const WithConnect = connect(mapStateToProps, mapDispatchToProps);

const enhance = compose(
  WithConnect
);

export default enhance(NavLink);
