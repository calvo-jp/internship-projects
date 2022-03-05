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
  async one(filter: { id: string | number } | { url: string }) {
    const request =
      "id" in filter
        ? new Request(BASE_URL + filter.id)
        : new Request(filter.url);

    try {
      const response = await fetch(request);
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

    const response = await fetch(`${BASE_URL}?offset=${offset}&limit=${limit}`);

    if (!response.ok) throw new Error(response.statusText);

    const data: NonNormalizedResponse = await response.json();

    const promises = data.results.map(({ url }) => read.one({ url }));
    const results = await Promise.allSettled(promises);
    const pokemons: IPokemon[] = [];

    for (const result of results) {
      if (result.status === "fulfilled" && !!result.value) {
        pokemons.push(result.value);
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
