import * as React from "react";

// typescript does not know how to handle this
// type checking should be bypassed in return stmt
type FetchStatus =
  | {
      loading: true;
      error: undefined;
      data: undefined;
    }
  | {
      loading: false;
      error: undefined;
      data: true;
    }
  | {
      loading: false;
      error: true;
      data: undefined;
    };

/**
 *
 * Fetch as hook
 *
 * _only supports json_
 *
 */
const useFetch = <T = any, E = any>(
  input: RequestInfo,
  init?: RequestInit
): FetchStatus => {
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

  // @ts-expect-error
  return { loading, error, data };
};

export default useFetch;
