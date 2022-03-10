import { gql } from "@apollo/client";

const CORE_POKEMON_DATA = gql`
  fragment CorePokemonData on pokemon_v2_pokemon {
    id
    name
  }
`;

export const GET_POKEMONS = gql`
  query GetPokemons {
    pokemon_v2_pokemon {
      ...CorePokemonData
    }
  }

  ${CORE_POKEMON_DATA}
`;

export const GET_POKEMON = gql`
  query GetPokemon($id: Int!) {
    pokemon_v2_pokemon_by_pk(id: $id) {
      ...CorePokemonData
    }
  }

  ${CORE_POKEMON_DATA}
`;
