import * as React from "react";
import arrayChunk from "utils/arrayChunk";

interface Props<T> {
  data: T[];
  rowsPerPage?: number;
  currentPage?: number;
}

const usePagination = <T = any>(props: Props<T>) => {
  const [currentPage, setCurrentPage] = React.useState(props.currentPage || 1);
  const [rowsPerPage] = React.useState(props.rowsPerPage || 10);
  const [chunks] = React.useState(arrayChunk(props.data, rowsPerPage));

  const [hasNext, setHasNext] = React.useState(false);
  const [hasPrev, setHasPrev] = React.useState(false);

  const next = () => {
    if (hasNext) setCurrentPage((n) => n + 1);
  };

  const prev = () => {
    if (hasPrev) setCurrentPage((n) => n - 1);
  };

  React.useEffect(() => {
    setHasNext(currentPage < chunks.length);
    setHasPrev(currentPage > 1);
  }, [chunks.length, currentPage]);

  return {
    rows: chunks.at(currentPage - 1) || [],
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
