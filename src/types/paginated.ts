import IPokemon from "./pokemon";

interface IPaginated {
  page: number;
  pageSize: number;
  rows: IPokemon[];
  totalRows: number;
  hasNext: boolean;
  hasPrevious: boolean;
}

export default IPaginated;
