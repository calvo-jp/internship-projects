import IPokemon from "types/pokemon";
import getPokemon from "./getPokemon";

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

const baseUrl = "https://pokeapi.co/api/v2/pokemon";

const getPokemons = async (params?: Params) => {
  const page = parseIntOrCoalesce(params?.page, 1);
  const limit = parseIntOrCoalesce(params?.pageSize, 20);
  const offset = (page - 1) * limit;

  const endpoint = `${baseUrl}?limit=${limit}&offset=${offset}`;
  const response = await fetch(endpoint);

  if (!response.ok) throw new Error(response.statusText);

  const data: NonNormalizedResponse = await response.json();

  const promises = data.results.map(({ url }) => getPokemon({ url }));
  const results = await Promise.allSettled(promises);
  const pokemons: IPokemon[] = [];

  for (const result of results) {
    if (result.status === "fulfilled" && result.value) {
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
};

const parseIntOrCoalesce = (
  subject: StringOrNumber | undefined,
  defaultValue: number
) => {
  defaultValue = Math.trunc(defaultValue);

  if (!subject) return defaultValue;

  if (typeof subject === "number") return Math.trunc(subject);

  const value = parseInt(subject);
  return Number.isNaN(value) ? defaultValue : Math.trunc(value);
};

export default getPokemons;
