export const getFirstLetterOfName = (str = "") => {
  if (str !== null) return str.charAt(0).toUpperCase();
  return new String("An Huy").charAt(0).toUpperCase();
};
