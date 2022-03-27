import { useRouter } from "next/router";

const useSearchParams = <K extends string>(...args: K[]) => {
  const router = useRouter();
  const query = router.query;

  const obj: Partial<{ [I in K]?: string | string[] }> = {};

  for (const arg of args) if (query[arg]) obj[arg] = query[arg];

  return {
    get(key: K) {
      if (key in obj) return [obj[key]].flat(1).at(0);
    },

    getAll(key: K): string[] {
      const value = obj[key];

      if (Array.isArray(value)) return value;
      if (typeof value === "string") return [value];

      return [];
    },
  };
};

export default useSearchParams;
