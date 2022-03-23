import { useRouter } from "next/router";

const useRedirect = () => {
  const router = useRouter();

  return (url: string, query: Record<string, any> = {}) => {
    router.push(url, { query }, { shallow: true });
  };
};

export default useRedirect;
