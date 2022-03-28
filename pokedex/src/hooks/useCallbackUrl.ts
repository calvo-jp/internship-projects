import { useRouter } from "next/router";

/**
 *
 * Gets `callbackUrl` query from url normally provided by next-auth.
 * Otherwise, defaults to `/pokemons`
 *
 */
const useCallbackUrl = () => {
  const router = useRouter();
  const callbackUrl = router.query.callbackUrl;

  if (Array.isArray(callbackUrl)) return callbackUrl[0];
  if (!callbackUrl) return "/pokemons";
  return callbackUrl;
};

export default useCallbackUrl;
