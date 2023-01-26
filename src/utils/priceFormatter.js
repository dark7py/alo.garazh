export const priceFormatter = (value) => value
  .toString()
  .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1 ');
