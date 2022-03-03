import { useEffect, useState } from "react";
import IPokemon from "types/pokemon";

interface D {
  rows: IPokemon[];
  page: number;
  hasNext: boolean;
}

const usePagination = (allRows: IPokemon[]) => {
  const [data, setData] = useState<D>({
    page: 1,
    rows: [],
    hasNext: true,
  });

  /** increments page by 1 */
  const next = () => {
    if (data.hasNext) {
      setData(({ page, ...etc }) => ({ page: page + 1, ...etc }));
    }
  };

  useEffect(() => {
    setData(({ page, rows }) => ({
      page,
      rows: [...rows, ...getPageRows(allRows, page)],
      hasNext: isThereNext(allRows, page),
    }));
  }, [allRows, data.page /* <- this triggers rerender */]);

  return { ...data, next };
};

const pageSize = 12;
const calcOffset = (page: number) => (page - 1) * pageSize;
const getPageRows = (rows: IPokemon[], page: number) => {
  const copy = [...rows];
  const offset = calcOffset(page);
  const array = copy.splice(offset, pageSize);
  return array;
};

const isThereNext = (allRows: IPokemon[], page: number) => {
  return page * pageSize < allRows.length;
};

export default usePagination;
