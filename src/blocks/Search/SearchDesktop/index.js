import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import { compose, branch, renderNothing } from 'recompose';
import { withRouter } from 'react-router-dom';

import { isMobileSelector } from 'modules/ui/selectors';
import { searchStringSelector } from 'modules/filters/selectors';
import { changeSearchString } from 'modules/filters/actions';

import SearchDesktop from './SearchDesktop';

const mapStateToProps = createSelector(
  isMobileSelector,
  searchStringSelector,
  (isMobile, searchString) => ({
    isMobile,
    searchString
  })
);

const mapDispatchToProps = {
  changeSearchString
};

const withBranch = branch(({ isMobile }) => isMobile, renderNothing);

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const enhance = compose(
  withConnect,
  withBranch,
  withRouter
);

export default enhance(SearchDesktop);
