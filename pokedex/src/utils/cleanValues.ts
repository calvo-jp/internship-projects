type Dictionary = Record<string, any>;
type Dirty = "" | null;

const isDictionary = (subject: any): subject is Dictionary =>
  Object(subject) === subject &&
  Object.prototype.toString.call(subject) === "[object Object]";

const isDirty = (subject: any): subject is Dirty => {
  // undefined
  if (typeof subject === "undefined") return true;
  // null values
  if (subject === null) return true;
  // empty string or string that contains nothing but spaces
  if (typeof subject === "string" && subject.trim() === "") return true;

  return false;
};

const cleanObject = (subject: Dictionary) => {
  const values: Dictionary = {};

  for (const [key, value] of Object.entries(subject))
    if (!isDirty(value)) values[key] = cleanValues(value);

  return values;
};

/** deeply removes object keys with null and empty string values */
const cleanValues = (subject: any): any => {
  if (Array.isArray(subject)) return subject.map(cleanValues);
  if (isDictionary(subject)) return cleanObject(subject);
  return subject;
};

export default cleanValues;
