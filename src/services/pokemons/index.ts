import IPaginated from "types/paginated";
import IPokemon from "types/pokemon";
import parseIntOrCoalesce from "utils/parseIntOrCoalesce";
import prettify from "./prettify";

interface Result {
  name: string;
  url: string;
}

type StringOrNull = string | null;

interface NonNormalizedResponse {
  count: number;
  results: Result[];
  next: StringOrNull;
  previous: StringOrNull;
}

type StringOrNumber = string | number;

interface Params {
  page?: StringOrNumber;
  pageSize?: StringOrNumber;
}

const BASE_URL = "https://pokeapi.co/api/v2/pokemon/";

const read = {
  async one(id: string | number) {
    try {
      const response = await fetch(BASE_URL + id);
      const pokemon = await response.json();

      return prettify(pokemon);
    } catch (e) {
      return null;
    }
  },

  async all(params?: Params): Promise<IPaginated> {
    const page = parseIntOrCoalesce(params?.page, 1);
    const limit = parseIntOrCoalesce(params?.pageSize, 20);
    const offset = (page - 1) * limit;

    const response = await fetch(`${BASE_URL}?limit=${limit}&offset=${offset}`);

    if (!response.ok) throw new Error(response.statusText);

    const data: NonNormalizedResponse = await response.json();

    const promises = data.results.map(({ url }) => fetch(url));
    const results = await Promise.allSettled(promises);
    const pokemons: IPokemon[] = [];

    for (const result of results) {
      if (result.status === "fulfilled") {
        const parsed = await result.value.json();
        pokemons.push(prettify(parsed));
      }
    }

    return {
      page,
      pageSize: limit,
      rows: pokemons,
      totalRows: data.count,
      hasNext: !!data.next,
      hasPrevious: !!data.previous,
    };
  },
};

const pokemonService = {
  read,
};

export default pokemonService;
