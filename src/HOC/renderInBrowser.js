import { isBrowser as getIsBrowser } from 'utils';

// render only in Browser
const renderInBrowser = (ComposedComponent) => {
  const isBrowser = getIsBrowser();

  if (isBrowser) {
    return ComposedComponent;
  }

  return () => null;
};

export default renderInBrowser;
