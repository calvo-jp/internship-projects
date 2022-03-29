import apolloClient from "config/apollo/client";
import { GET_POKEMON_TYPES } from "graphql/pokeapi/queries";
import { GetPokemonStats } from "__generated__/GetPokemonStats";
import { GetPokemonTypes } from "__generated__/GetPokemonTypes";

type PokemonTypes = NonNullable<GetPokemonStats["pokemon"]>["types"];

const stats = {
  async read(types: PokemonTypes) {
    const endpoint = "https://pokeapi.co/api/v2/type/";

    const requests = types.reduce<Promise<Response>[]>((arr, { type }) => {
      if (!type) return arr;

      const response = fetch(endpoint + type.id);

      return [...arr, response];
    }, []);

    const responses = await Promise.allSettled(requests);
    const weaknesses: Record<string, any>[] = [];
    const resistance: Record<string, any>[] = [];

    for (const response of responses) {
      if (response.status === "fulfilled" && response.value) {
        const data = await response.value.json();

        resistance.push(
          ...data.damage_relations.double_damage_to,
          ...data.damage_relations.half_damage_from,
          ...data.damage_relations.no_damage_from
        );

        weaknesses.push(
          ...data.damage_relations.double_damage_from,
          ...data.damage_relations.half_damage_to,
          ...data.damage_relations.no_damage_to
        );
      }
    }

    // filter unique
    return {
      weaknesses: weaknesses.reduce<string[]>(
        (arr, obj) => (arr.includes(obj.name) ? arr : [...arr, obj.name]),
        []
      ),
      resistance: resistance.reduce<string[]>(
        (arr, obj) => (arr.includes(obj.name) ? arr : [...arr, obj.name]),
        []
      ),
    };
  },
};

const types = {
  read: {
    async all() {
      const { data } = await apolloClient.query<GetPokemonTypes>({
        query: GET_POKEMON_TYPES,
      });

      return data.types.map(({ name }) => name);
    },
  },
};

const pokemons = {
  stats,
  types,
};

export default pokemons;
