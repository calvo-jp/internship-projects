interface IPaginated<T = unknown> {
  rows: T[];
  page: number;
  pageSize: number;
  hasNext: boolean;
  totalRows: number;
}

export default IPaginated;
