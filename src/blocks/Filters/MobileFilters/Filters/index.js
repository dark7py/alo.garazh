import loadable from '@loadable/component';

const Filters = loadable(
  () => import('./Filters')
);

export default Filters;
