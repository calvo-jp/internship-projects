import { useRouter } from "next/router";
import * as React from "react";
import arrayChunk from "utils/arrayChunk";

interface Config {
  onPageChange?: (newValue: number) => void;
  onPageSizeChange?: (newValue: number) => void;
}

/**
 *
 * pagination implementation that
 * respects query string `page` and `pageSize` by default.
 * Also, works without it.
 *
 * @example
 * const router = useRouter();
 *
 * const {
 *   next,
 *   prev,
 *   rows,
 *   page,
 *   pageSize,
 *   totalRows,
 *   totalPages,
 *   changePageSize,
 * } = usePagination(avengers, {
 *   onPageChange(page) {
 *     router.push(router.basePath, {
 *       query: {
 *         page,
 *         pageSize,
 *       },
 *     });
 *   },
 *   onPageSizeChange(pageSize) {
 *     router.push(router.basePath, {
 *       query: {
 *         page,
 *         pageSize,
 *       },
 *     });
 *   },
 * });
 *
 */
const usePagination = <T extends Array<any>>(data: T, config: Config = {}) => {
  const router = useRouter();

  const [page, setPage] = React.useState(1);
  const [pageSize, setPageSize] = React.useState(5);
  const [chunks, setChunks] = React.useState<T[]>([]);
  const [hasNext, setHasNext] = React.useState(false);
  const [hasPrev, setHasPrev] = React.useState(false);

  const increment = (by = 1) => {
    setPage((old) => {
      const current = old + by;
      config.onPageChange && config.onPageChange(current);
      return current;
    });
  };

  const decrement = (by = 1) => {
    setPage((old) => {
      const current = old - by;
      config.onPageChange && config.onPageChange(current);
      return current;
    });
  };

  const changePageSize = (newValue: number) => {
    setPageSize(() => {
      config.onPageSizeChange && config.onPageSizeChange(newValue);
      return newValue;
    });
  };

  const next = () => {
    if (!hasNext) return;
    increment();
  };

  const prev = () => {
    if (!hasPrev) return;
    decrement();
  };

  React.useEffect(() => {
    setHasNext(page < chunks.length);
    setHasPrev(page > 1);
    setChunks(arrayChunk(data, pageSize));

    const p = queryToIntOrUndefined(router.query.page);
    const s = queryToIntOrUndefined(router.query.pageSize);

    if (p && p !== page) setPage(p);
    if (s && s !== pageSize) setPageSize(s);
  }, [chunks.length, data, page, pageSize, router.query]);

  return {
    /** current page index */
    page,
    /** aka. rows-per-page */
    pageSize,
    /** number of pages based on pageSize */
    totalPages: chunks.length,
    /** total number of data */
    totalRows: data.length,
    /** portion of data which is based on current page and pageSize  */
    rows: chunks.at(page - 1) || [],
    /** checks if a next page exists */
    hasNext,
    /** checks if a previous page exists */
    hasPrev,
    /** navigate to next page */
    next,
    /** navigate to previous page */
    prev,
    /** changes the size or rows per page */
    changePageSize,
  };
};

const queryToIntOrUndefined = (subject: string[] | string | undefined) => {
  const scalar = [subject].flat(1).at(0);
  if (scalar && isNumeric(scalar)) return parseInt(scalar);
};

const isNumeric = (subject: string) => /\d+/.test(subject);

export default usePagination;
