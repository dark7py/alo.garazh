import withSizes from 'react-sizes';

const mapSizesToProps = ({ width }) => ({
  isMobileBrowser: width < 650
});

export default (ComposedComponent) => {
  if (!(Object.prototype.toString.call(global.process) === '[object process]'
    && !global.process.browser)) {
    return withSizes(mapSizesToProps)(ComposedComponent);
  }

  return ComposedComponent;
};
