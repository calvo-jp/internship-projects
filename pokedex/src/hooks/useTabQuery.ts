import { useRouter } from "next/router";

const tabs = ["about", "statistics", "evolution", "moves", "videos"] as const;

const useTabQuery = () => {
  const router = useRouter();

  const currentTab = [router.query.tab].flat(1).at(0)?.toLowerCase().trim();

  // can't use Array#includes here
  // see: https://github.com/microsoft/TypeScript/issues/26255
  return tabs.find((tab) => tab === currentTab) ?? tabs[0];
};

export default useTabQuery;
