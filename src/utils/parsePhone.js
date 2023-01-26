export const parsePhone = (phone) => phone
  .replace(/\s|\(|\)/g, '')
  .replace('+', '');
