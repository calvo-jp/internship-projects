const parseIntOrCoalesce = (
  subject: string | number | undefined | null,
  defaultValue: number
) => {
  if (!subject) return defaultValue;

  if (typeof subject === "number") return subject;

  const value = parseInt(subject);
  return !Number.isNaN(value) ? value : defaultValue;
};

export default parseIntOrCoalesce;
