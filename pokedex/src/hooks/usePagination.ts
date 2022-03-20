import * as React from "react";
import arrayChunk from "utils/arrayChunk";

interface Props<T> {
  data: T[];
  rowsPerPage?: number;
  currentPage?: number;
}

const usePagination = <T>(props: Props<T>) => {
  const [currentPage, setCurrentPage] = React.useState(props.currentPage || 1);
  const [rowsPerPage, setRowsPerPage] = React.useState(props.rowsPerPage || 10);

  const [chunks, setChunks] = React.useState(
    arrayChunk(props.data, rowsPerPage)
  );

  const [hasNext, setHasNext] = React.useState(false);
  const [hasPrev, setHasPrev] = React.useState(false);

  const next = () => {
    if (hasNext) setCurrentPage((n) => n + 1);
  };

  const prev = () => {
    if (hasPrev) setCurrentPage((n) => n - 1);
  };

  React.useEffect(() => {
    if (currentPage >= chunks.length) setHasNext(false);
    if (currentPage <= 1) setHasPrev(false);

    return () => {
      setChunks([]);
      setRowsPerPage(10);
      setCurrentPage(1);
      setHasNext(false);
      setHasPrev(false);
    };
  }, [chunks.length, currentPage]);

  return {
    rows: chunks.at(currentPage) || [],
    currentPage,
    rowsPerPage,
    totalPages: chunks.length,
    hasNext,
    hasPrev,
    next,
    prev,
  };
};

export default usePagination;
