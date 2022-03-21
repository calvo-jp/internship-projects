import * as React from "react";
import arrayChunk from "utils/arrayChunk";

interface Config {
  rowsPerPage?: number;
  currentPage?: number;
}

const usePagination = <T = any>(data: T[], config: Config = {}) => {
  const [currentPage, setCurrentPage] = React.useState(config.currentPage || 1);
  const [rowsPerPage] = React.useState(config.rowsPerPage || 20);
  const [chunks] = React.useState(arrayChunk(data, rowsPerPage));

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
    totalRows: data.length,
    rowsPerPage,
    currentPage,
    totalPages: chunks.length,
    prev,
    next,
    hasPrev,
    hasNext,
    prevPage: hasPrev ? currentPage - 1 : null,
    nextPage: hasNext ? currentPage + 1 : null,
  };
};

export default usePagination;
