import PropTypes from 'prop-types';

export const locationType = {
  key: PropTypes.string,
  pathname: PropTypes.string,
  search: PropTypes.string,
  hash: PropTypes.string,
  state: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.number,
    PropTypes.string
  ])
};
