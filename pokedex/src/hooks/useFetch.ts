import * as React from "react";

/**
 *
 * Fetch as hook
 *
 * _only supports json_
 *
 */
const useFetch = <T = any, E = any>(input: RequestInfo, init?: RequestInit) => {
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<E>();
  const [data, setData] = React.useState<T | null>(null);

  React.useEffect(() => {
    fetch(input, init)
      .then((response) => response.json())
      .then(setData)
      .catch(setError)
      .finally(() => setLoading(false));
  }, [init, input]);

  return {
    loading,
    error,
    data,
  };
};

export default useFetch;
