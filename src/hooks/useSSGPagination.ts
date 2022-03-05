import { useState } from "react";
import services from "services";
import IPaginated from "types/paginated";

const useSSGPagination = (init: IPaginated) => {
  const [data, setData] = useState(init);
  const [error, setError] = useState(false);
  const [fetching, setFetching] = useState(false);

  const next = async () => {
    if (data.hasNext) {
      setFetching(true);

      try {
        const { rows, ...newData } = await services.pokemons.read.all({
          page: data.page + 1,
          pageSize: data.pageSize,
        });

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
