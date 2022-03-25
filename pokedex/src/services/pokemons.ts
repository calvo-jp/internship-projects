import apolloClient from "config/apollo/client";
import { GET_POKEMON_TYPES } from "graphql/pokeapi/queries";
import { GetPokemonStats } from "__generated__/GetPokemonStats";
import { GetPokemonTypes } from "__generated__/GetPokemonTypes";

type Types = NonNullable<GetPokemonStats["pokemon"]>["types"];

const weaknesses = async (types: Types) => {
  const requests = types.map(({ type }) => {
    if (type) return fetch("https://pokeapi.co/api/v2/type/" + type.id);
  });

  const responses = await Promise.allSettled(requests);

  const array: Record<string, any>[] = [];

  for (const response of responses) {
    if (response.status === "fulfilled" && response.value) {
      const data = await response.value.json();

      array.push(
        ...data.damage_relations.double_damage_from,
        ...data.damage_relations.half_damage_to,
        ...data.damage_relations.no_damage_to
      );
    }
  }

  return array.reduce<string[]>((container, obj) => {
    return container.includes(obj.name) ? container : [...container, obj.name];
  }, []);
};

const resistance = async (types: Types) => {
  const requests = types.map(({ type }) => {
    if (type) return fetch("https://pokeapi.co/api/v2/type/" + type.id);
  });

  const responses = await Promise.allSettled(requests);

  const array: Record<string, any>[] = [];

  for (const response of responses) {
    if (response.status === "fulfilled" && response.value) {
      const data = await response.value.json();

      array.push(
        ...data.damage_relations.double_damage_to,
        ...data.damage_relations.half_damage_from,
        ...data.damage_relations.no_damage_from
      );
    }
  }

  return array.reduce<string[]>((container, obj) => {
    return container.includes(obj.name) ? container : [...container, obj.name];
  }, []);
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
  weaknesses,
  resistance,
  types,
};

export default pokemons;
