import * as React from "react";

// typescript does not know how to handle this
// type checking should be bypassed in return stmt
type FetchStatus<D, E> =
  | {
      loading: true;
      error: undefined;
      data: undefined;
    }
  | {
      loading: false;
      error: undefined;
      data: D;
    }
  | {
      loading: false;
      error: E;
      data: undefined;
    };

/**
 *
 * Fetch as hook
 *
 * _only supports json_
 *
 */
const useFetch = <D = any, E = any>(
  input: RequestInfo,
  init?: RequestInit
): FetchStatus<D, E> => {
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<E>();
  const [data, setData] = React.useState<D>();

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
