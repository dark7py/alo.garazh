export const getSuggestsOptions = (items) => items
  .map((item) => ({ value: item.slug, label: item.name }));
