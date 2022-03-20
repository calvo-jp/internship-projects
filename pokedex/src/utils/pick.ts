type Dict = Record<string, any>;

const pick = <T extends Dict, K extends keyof T>(obj: T, ...keys: K[]) => {
  const picked: {
    [I in K]?: T[I];
  } = {};

  for (const key of keys) {
    if (obj[key]) {
      picked[key] = obj[key];
    }
  }

  return picked;
};

export default pick;
