import * as React from "react";

const useFetch = <T = any>(input: RequestInfo, init?: RequestInit) => {
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(false);
  const [data, setData] = React.useState<T | null>(null);

  React.useEffect(() => {
    fetch(input, init)
      .then((response) => response.json())
      .then((data) => setData(data))
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, [init, input]);

  return {
    loading,
    error,
    data,
  };
};

export default useFetch;
