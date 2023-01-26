import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import { compose, branch, renderComponent } from 'recompose';
import { withRouter } from 'react-router-dom';

import { searchStringSelector } from 'modules/filters/selectors';
import { changeSearchString, save } from 'modules/filters/actions';

import SearchMobile from './SearchMobile';
import SearchFullScreen from './SearchFullScreen';

const mapStateToProps = createSelector(
  searchStringSelector,
  (searchString) => ({
    searchString
  })
);

const mapDispatchToProps = {
  changeSearchString,
  save
};

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withBranch = branch(
  ({ history }) => history.location.hash === '#search',
  renderComponent(SearchFullScreen)
);

const enhance = compose(
  withRouter,
  withConnect,
  withBranch
);

export default enhance(SearchMobile);
