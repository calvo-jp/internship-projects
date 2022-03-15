import { useRouter } from "next/router";

const useCallbackUrl = () => {
  const router = useRouter();
  const callbackUrl =
    [router.query.callbackUrl].flat(1).at(0) || "/admin/dashboard";

  return callbackUrl;
};

export default useCallbackUrl;
