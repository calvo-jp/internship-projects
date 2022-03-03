import { useState } from "react";
import getPokemons from "utils/getPokemons";

const useSSGPagination = (init: Awaited<ReturnType<typeof getPokemons>>) => {
  const [data, setData] = useState(init);
  const [error, setError] = useState(false);
  const [fetching, setFetching] = useState(false);

  const next = async () => {
    if (data.hasNext) {
      setFetching(true);

      try {
        const { rows, ...newData } = await getPokemons({ page: data.page + 1 });

        setData((old) => ({
          ...newData,
          rows: [...old.rows, ...rows],
        }));
      } catch {
        setError(true);
      } finally {
        setFetching(false);
      }
    }
  };

  return { ...data, next, fetching, error };
};

export default useSSGPagination;
