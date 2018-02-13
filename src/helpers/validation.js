/**
 * function to validate user name
 * @param {String} value [user name]
 * @returns {Boolean}
 */
export const isValidName = value => {
  const reg = /^[a-zA-Z'.\s]+$/g;
  return reg.test(value);
};

 /**
 * function to validate phone number
 * @link https://stackoverflow.com/a/16702965
 */
export const isValidPhoneNumber = value => {
  const reg = /^\s*(?:\+?(\d{1,3}))?[-. (]*(\d{3})[-. )]*(\d{3})[-. ]*(\d{4})(?: *x(\d+))?\s*$/g;
  return reg.test(value);
};

/**
 * function to validate email
 * @link https://stackoverflow.com/a/46181
 */
export const isValidEmail = value => {
  const reg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return reg.test(value);
};