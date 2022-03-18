type Value = string | number | boolean | null | undefined | (() => Value);

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
const valx = (o: Record<string, Value>) => {
  for (const [k, v] of Object.entries(o)) {
    // function
    if (typeof v === "function") if (!!v()) return k;

    // other values
    if (!!v) return k;
  }
};

export default valx;
