type Dict = Record<string, any>;

/**
 *
 * Picks key-value pairs from an object
 * and creates new object out of it
 *
 * @example
 * const o = {
 *    prop1: 1,
 *    prop2: 2,
 *    prop3: 3
 * }
 *
 * pick(o, "prop1", "prop2") // { [key]: number | undefined }
 *
 *
 */
const pick = <O extends Dict, K extends keyof O>(o: O, ...keys: K[]) => {
  const picked: { [I in K]?: O[I] } = {};

  for (const key of keys) {
    if (key in o) {
      picked[key] = o[key];
    }
  }

  return picked;
};

export default pick;
