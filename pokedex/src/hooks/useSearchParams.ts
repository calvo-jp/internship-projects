import { useRouter } from "next/router";

/**
 *
 * Abstraction of `useRouter` which only returns specified
 * keys and is typesafe
 *
 * @example
 * const query = useQuery("id", "someQuery")
 * query.get("id") // string | undefined
 * query.getAll("someQuery")  // string[]
 *
 */
const useSearchParams = <T extends string>(...keys: T[]) => {
  const { query } = useRouter();

  const params: Partial<Record<T, string | string[] | undefined>> = {};

  for (const key of keys) {
    if (query[key]) {
      params[key] = query[key];
    }
  }

  return {
    // explicit return type due to an existing issue
    // found at https://stackoverflow.com/questions/58876457/why-type-inference-is-lost-when-using-array-isarray
    getAll(key: T): string[] {
      const value = params[key];
      if (!value) return [];
      if (Array.isArray(value)) return value;
      return [value];
    },
    get(key: T) {
      return [params[key]].flat(1).at(0);
    },
  };
};

export default useSearchParams;