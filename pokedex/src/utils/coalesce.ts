const coalesce = (...args: any[]) => {
  for (const arg of args) if (!!arg) return arg;
};

export default coalesce;
