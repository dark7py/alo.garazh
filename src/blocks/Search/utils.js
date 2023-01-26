export const getSuggestsOptions = (items, inputValue) => [
  inputValue,
  ...items.hints,
  ...items.my_history,
  ...items.popular
].filter((value) => value).map((item) => ({ value: item, label: item }));
