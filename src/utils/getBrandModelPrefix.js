export const getBrandModelPrefix = (brand, model) => {
  let prefix = '/';

  if (brand) {
    prefix += brand;
  }

  if (model) {
    prefix += `/${model}`;
  }

  return prefix;
};

export default getBrandModelPrefix;
