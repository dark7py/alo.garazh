import { connect } from 'react-redux';
import { compose, lifecycle } from 'recompose';

import { clearErrors } from 'modules/errors/actions';

import ErrorPage from './ErrorPage';

const withLifecycle = lifecycle({
  componentWillUnmount() {
    this.props.clearErrors();
  }
});

const mapStateToProps = null;

const mapDispatchToProps = {
  clearErrors
};

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const enhance = compose(
  withConnect,
  withLifecycle
);

export default enhance(ErrorPage);
