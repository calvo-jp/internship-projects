const minValue = Number.MIN_VALUE;
const maxValue = Number.MAX_VALUE;

let alphabet = "ABCDEFGHIGJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"[
  Symbol.iterator
]();

let currentId = minValue;
let prefix = minValue;
let suffix = alphabet.next().value;

/**
 *
 * @example
 * const generateId = randomIdGenerator()
 * console.log(generateId()) // <number>
 *
 */
const randomIdGenerator = () => {
  // This does not normally happen,
  // but just in case we ranout of numbers.
  // If alphabet runs out, then goodbye world. 💀💀
  if (prefix >= maxValue && !alphabet.next().done)
    suffix = alphabet.next().value;

  return () => {
    // check if currentId needs to be reset
    if (currentId >= maxValue) {
      currentId = minValue;
      prefix += minValue;
    }

    const id = `__${prefix}__${currentId}__${suffix}__`;
    currentId += minValue;
    return id;
  };
};

export default randomIdGenerator;
