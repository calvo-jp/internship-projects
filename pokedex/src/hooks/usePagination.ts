import * as React from "react";
import arrayChunk from "utils/arrayChunk";

interface Config {
  rowsPerPage?: number;
  currentPage?: number;
}

const usePagination = <T extends Array<any>>(data: T, config: Config = {}) => {
  const [loading, setLoading] = React.useState(true);
  const [currentPage, setCurrentPage] = React.useState(1);
  const [rowsPerPage, setRowsPerPage] = React.useState(20);
  const [chunks, setChunks] = React.useState<T[]>([]);
  const [hasNext, setHasNext] = React.useState(false);
  const [hasPrev, setHasPrev] = React.useState(false);

  const next = () => {
    if (hasNext) setCurrentPage((n) => n + 1);
  };

  const prev = () => {
    if (hasPrev) setCurrentPage((n) => n - 1);
  };

  React.useEffect(() => {
    if (config.currentPage) setCurrentPage(config.currentPage);
    if (config.rowsPerPage) setRowsPerPage(config.rowsPerPage);
    setChunks(arrayChunk(data, rowsPerPage));
    setHasNext(currentPage < chunks.length);
    setHasPrev(currentPage > 1);
    setLoading(false);
  }, [
    chunks.length,
    config.currentPage,
    config.rowsPerPage,
    currentPage,
    data,
    rowsPerPage,
  ]);

  return {
    loading,
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
