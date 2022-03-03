import IPaginated from "types/paginated";
import IPokemon from "types/pokemon";
import normalizePokemonObject from "utils/normalizePokemonObject";

interface IResult {
  name: string;
  url: string;
}

type StringOrNull = string | null;

interface NonNormalizedPaginated {
  count: number;
  results: IResult[];
  next: StringOrNull;
  previous: StringOrNull;
}

type StringOrNumber = string | number;

interface Params {
  /** page number or index */
  page?: StringOrNumber;
  /** aka limit */
  pageSize?: StringOrNumber;
}

/** default page size */
const DEFAULT_PAGESIZE = 20;

type PokemonsFetcher = (params?: Params) => Promise<IPaginated>;

const getPokemons: PokemonsFetcher = async ({
  page = 1,
  pageSize = DEFAULT_PAGESIZE,
} = {}) => {
  page = parseIntOrCoalesceIfNanOrZero(page, 1);
  pageSize = parseIntOrCoalesceIfNanOrZero(pageSize, DEFAULT_PAGESIZE);
  pageSize = inRangeCoalesce(pageSize, DEFAULT_PAGESIZE, 240);

  const offset = (page - 1) * pageSize;

  const params = new URLSearchParams();
  params.append("limit", pageSize.toString());
  params.append("offset", offset.toString());
  const query = params.toString();

  try {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon?${query}`);

    if (!response.ok) throw new Error(response.statusText);

    const data: NonNormalizedPaginated = await response.json();

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
  } catch (error) {
    console.log(error);
    throw new Error("Something went wrong while fetching the API");
  }
};

const inRangeCoalesce = (subject: number, min: number, max: number) => {
  return subject <= max && subject >= min ? subject : min;
};

const parseIntOrCoalesceIfNanOrZero = <
  S extends undefined | string | number,
  D
>(
  subject: S,
  defaultValue: D
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
