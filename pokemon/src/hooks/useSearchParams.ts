import { useRouter } from "next/router";

const useSearchParams = <T extends string>(...args: T[]) => {
  const router = useRouter();
  const query = router.query;

  const obj: Partial<{
    [K in T]?: string | string[];
  }> = {};

  for (const arg of args) {
    if (query[arg]) {
      obj[arg] = query[arg];
    }
  }

  return {
    get(key: keyof typeof obj) {
      if (key in obj) return [obj[key]].flat(1).at(0);
    },

    getAll(key: keyof typeof obj): string[] {
      const value = obj[key];

      if (Array.isArray(value)) return value;

      if (typeof value === "string") return [value];

      return [];
    },
  };
};

export default useSearchParams;
