const tag = "[object Object]";

const isObject = (subject: unknown): subject is Record<string, any> =>
  Object(subject) === subject &&
  Object.prototype.toString.call(subject) === tag;

export default isObject;
