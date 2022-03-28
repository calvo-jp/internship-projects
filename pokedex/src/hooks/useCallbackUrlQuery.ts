import { useRouter } from "next/router";

/**
 *
 * Gets `callbackUrl` query from url normally provided by next-auth.
 * Otherwise, defaults to `/pokemons`
 *
 */
const useCallbackUrlQuery = () => {
  const router = useRouter();

  return [router.query.callbackUrl].flat(1).at(0) ?? "/pokemons";
};

export default useCallbackUrlQuery;
