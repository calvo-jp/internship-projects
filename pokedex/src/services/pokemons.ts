import apolloClient from "config/apollo/client";
import { GET_POKEMON_TYPES } from "graphql/pokeapi/queries";
import { GetPokemonTypes } from "__generated__/GetPokemonTypes";

const stats = {
  read: {
    async all(pokemonTypeIds: number[]) {
      const endpoint = "https://pokeapi.co/api/v2/type/";

      const responses = pokemonTypeIds.map((id) => fetch(endpoint + id));
      const results = await Promise.allSettled(responses);

      const weaknesses: Record<string, any>[] = [];
      const resistance: Record<string, any>[] = [];

      for (const result of results) {
        if (result.status === "fulfilled" && result.value) {
          const data = await result.value.json();

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
        weaknesses: weaknesses.reduce<string[]>((arr, obj) => {
          return arr.includes(obj.name) ? arr : [...arr, obj.name];
        }, []),
        resistance: resistance.reduce<string[]>((arr, obj) => {
          return arr.includes(obj.name) ? arr : [...arr, obj.name];
        }, []),
      };
    },
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
