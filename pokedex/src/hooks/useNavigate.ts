import { useRouter } from "next/router";
import cleanValues from "utils/cleanValues";

// equivalent to NextJS' TransitionOptions which is not importable
interface Config {
  scroll?: boolean;
  locale?: string;
  shallow?: boolean;
}

const useNavigate = (config?: Config) => {
  const router = useRouter();

  return (url: string, query?: Record<string, any>) => {
    const search = new URLSearchParams(cleanValues(query));

    router.push([url, search.toString()].join("?"), undefined, config);
  };
};

export default useNavigate;
