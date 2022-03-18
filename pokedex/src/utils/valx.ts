/**
 *
 * @description
 * Helps in resolving prop values that depends on other props.
 *
 * @example
 * <Alert
 *    bgColor={{
 *      "red-200": variant === "error",
 *      "blue-200": variant === "info",
 *      "green-200": variant === "success",
 *    }}
 * >
 * ...
 * </Alert/>
 *
 */
const valx = (o: Record<string, any>) => {
  for (const [key, value] of Object.entries(o)) {
    // mixed
    if (isTruthy(value)) return key;
    // function
    if (typeof value === "function" && isTruthy(value())) return key;
    // array
    if (Array.isArray(value) && value.every(isTruthy)) return key;
  }
};

const isTruthy = (subject: any) => {
  return isMixed(subject) && !!subject;
};

type Mixed = string | number | boolean | null | undefined;

const isMixed = (subject: any): subject is Mixed => {
  return (
    subject === null ||
    "string number boolean undefined".split(/\s/).includes(typeof subject)
  );
};

export default valx;
