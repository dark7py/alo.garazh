import { hot } from 'react-hot-loader/root';
import { createSelector } from 'reselect';
import { connect } from 'react-redux';
import { lifecycle, compose } from 'recompose';

import { isMobileSelector, getCityId } from 'modules/ui/selectors';
import { setIsMobile } from 'modules/ui/actions';
import { getUserInfo } from 'modules/user/actions';

import isMobileHOC from 'HOC/isMobile';

import App from './App';

const mapStateToProps = createSelector(
  isMobileSelector,
  getCityId,
  (isMobile, city) => ({ isMobile, city })
);

const mapDispatchToProps = { setIsMobile, getUserInfo };

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withLifecycle = lifecycle({
  componentDidMount() {
    const {
      isMobile,
      isMobileBrowser
    } = this.props;

    // Проверка, мобильное устройство или нет по разрешению
    if (isMobile !== isMobileBrowser) {
      this.props.setIsMobile(isMobileBrowser);
    }
  },
  componentDidUpdate() {
    const {
      isMobile,
      isMobileBrowser
    } = this.props;

    if (isMobile !== isMobileBrowser) {
      this.props.setIsMobile(isMobileBrowser);
    }
  }
});

const hocs = [
  isMobileHOC,
  withConnect,
  withLifecycle
];

export default process.env.NODE_ENV !== 'production'
  ? compose(hot, ...hocs)(App)
  : compose(...hocs)(App);
