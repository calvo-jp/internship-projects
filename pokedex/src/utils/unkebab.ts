/**
 *
 * Converts kebab case to normal strings
 *
 * @example
 * const str = unkebab("kebab-cased")
 * console.log(str) // kebab cased
 *
 */
const unkebab = (subject: string) => {
  return subject.replace(/\-/g, " ");
};

export default unkebab;
