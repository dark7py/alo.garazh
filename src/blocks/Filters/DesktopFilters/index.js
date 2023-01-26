import loadable from '@loadable/component';

const DesktopFilters = loadable(
  () => import('./DesktopFilters')
);

export default DesktopFilters;
