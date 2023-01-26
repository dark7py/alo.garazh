import PropTypes from 'prop-types';

export const historyType = {
  length: PropTypes.number,
  action: PropTypes.string,
  location: PropTypes.shape({
    pathname: PropTypes.string,
    search: PropTypes.string,
    hash: PropTypes.string,
    state: PropTypes.string
  }),
  push: PropTypes.func,
  replace: PropTypes.func,
  go: PropTypes.func,
  goBack: PropTypes.func,
  goForward: PropTypes.func,
  block: PropTypes.func
};
