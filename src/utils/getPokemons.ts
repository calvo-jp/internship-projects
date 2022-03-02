import IPokemon from "types/pokemon";
import normalizePokemonObject from "utils/normalizePokemonObject";

interface IResult {
  name: string;
  url: string;
}

type StringOrNull = string | null;

interface IPaginated {
  count: number;
  results: IResult[];
  next: StringOrNull;
  previous: StringOrNull;
}

type StringOrNumber = string | number;

interface Params {
  /** page number or index */
  page?: StringOrNumber;
  /** page size or limit */
  pageSize?: StringOrNumber;
}

/** default page size */
const PAGESIZE = 30;

const getPokemons = async ({ page = 1, pageSize = PAGESIZE }: Params = {}) => {
  page = parseIntOrCoalesceIfNanOrZero(page, 1);
  pageSize = parseIntOrCoalesceIfNanOrZero(pageSize, PAGESIZE);
  pageSize = inRangeCoalesce(pageSize, PAGESIZE, 100);

  const offset = (page - 1) * pageSize;

  const params = new URLSearchParams();
  params.append("limit", pageSize.toString());
  params.append("offset", offset.toString());
  const query = params.toString();

  const response = await fetch(`${process.env.API_BASE_URL}?${query}`);
  const data: IPaginated = await response.json();

  const promises = data.results.map(({ url }) => fetch(url));
  const results = await Promise.allSettled(promises);
  const rows: IPokemon[] = [];

  for (const result of results) {
    if (result.status === "fulfilled") {
      const parsed = await result.value.json();
      const pokemon = normalizePokemonObject(parsed);

      rows.push(pokemon);
    }
  }

  return {
    page,
    pageSize,
    rows,
    totalRows: data.count,
    hasNext: !!data.next,
    hasPrevious: !!data.previous,
  };
};

const inRangeCoalesce = (subject: number, min: number, max: number) => {
  return subject <= max && subject >= min ? subject : min;
};

const parseIntOrCoalesceIfNanOrZero = <_, T>(
  subject: undefined | string | number,
  defaultValue: T
) => {
  // undefined
  if (!subject) return defaultValue;

  // number <= 0
  if (typeof subject === "number") return subject > 0 ? subject : defaultValue;

  // string
  const value = parseInt(subject);
  return !Number.isNaN(value) && value > 0 ? value : defaultValue;
};

export default getPokemons;
