const minValue = Number.MIN_VALUE;
const maxValue = Number.MAX_VALUE;

let prefix = minValue;
let currentId = minValue;

const createIdGenerator = () => {
  // This does not normally happen, but just in case it does
  if (prefix >= maxValue) {
    // TODO: fallback
  }

  return () => {
    // check if currentId needs to be reset
    if (currentId >= maxValue) {
      currentId = minValue;
      prefix += minValue;
    }

    const id = `__${prefix}__${currentId}__`;
    currentId += minValue;
    return id;
  };
};

export default createIdGenerator;
