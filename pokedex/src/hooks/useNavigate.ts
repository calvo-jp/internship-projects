import { useRouter } from "next/router";
import cleanValues from "utils/cleanValues";

const useNavigate = (shallow?: boolean) => {
  const router = useRouter();

  return (url: string, query?: Record<string, any>) => {
    const search = new URLSearchParams(cleanValues(query));

    router.push([url, search.toString()].join("?"), undefined, {
      shallow,
    });
  };
};

export default useNavigate;
