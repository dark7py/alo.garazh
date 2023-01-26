/* eslint-disable */
export const validPhone = (value) => {
  const phoneReg = /^(\+7|7|8)?[\s\-]?\(?[489][0-9]{2}\)?[\s\-]?[0-9]{3}[\s\-]?[0-9]{2}[\s\-]?[0-9]{2}$/

  if (phoneReg.test(value)) {
    return true
  }
  return false
};
