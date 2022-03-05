const isObject = (subject: any): subject is Record<string, any> => {
  return (
    Object(subject) === subject &&
    Object.prototype.toString.call(subject) === "[object Object]"
  );
};

export default isObject;
