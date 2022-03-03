import { useRouter } from "next/router";

const useSSRRedirect = () => {
  const router = useRouter();

  const redirect = (page: number, pageSize: number) => {
    router.push({
      pathname: "/ssr/pokemons",
      query: {
        page,
        pageSize,
      },
    });
  };

  return redirect;
};

export default useSSRRedirect;
