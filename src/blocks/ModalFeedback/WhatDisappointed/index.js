import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import { compose, branch, renderNothing } from 'recompose';

import { getFosOptions } from 'modules/data/selectors';

import WhatDisappointed from './WhatDisappointed';

const mapStateToProps = createSelector(
  getFosOptions,
  (fosOptions) => ({
    fosOptions
  })
);

const withBranch = branch(({ fosOptions }) => !fosOptions, renderNothing);

const withConnect = connect(mapStateToProps, null);

const enhance = compose(
  withConnect,
  withBranch
);

export default enhance(WhatDisappointed);
