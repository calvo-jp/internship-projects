type Subject = string | string[] | undefined;
type IntOrUndefined = number | undefined;

/**
 *
 * tries to convert router query values to int or undefined
 *
 * @example
 * routerQueryValueToIntOrUndefined(router.query.page)
 *
 */
const routerQueryValueToIntOrUndefined = (subject: Subject): IntOrUndefined => {
  // ensure not an array
  const scalar = [subject].flat(1).at(0);

  if (scalar && isNumeric(scalar)) return parseInt(scalar);
};

const isNumeric = (value: string) => /\d+/.test(value);

export default routerQueryValueToIntOrUndefined;
