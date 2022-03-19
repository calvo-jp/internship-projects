import { gql } from "@apollo/client";

export const CORE_POKEMON_DETAILS = gql`
  fragment CorePokemonDetails on pokemon_v2_pokemon {
    id
    name
    types: pokemon_v2_pokemontypes {
      id
      type: pokemon_v2_type {
        name
      }
    }
  }
`;

export const GET_POKEMONS = gql`
  query GetPokemons($limit: Int!) {
    pokemons: pokemon_v2_pokemon(limit: $limit) {
      ...CorePokemonDetails
    }

    ${CORE_POKEMON_DETAILS}
  }
`;

export const GET_POKEMON = gql`
  query GetPokemon($id: Int!) {
    pokemon: pokemon_v2_pokemon_by_pk(id: $id) {
      ...CorePokemonDetails
    }

    ${CORE_POKEMON_DETAILS}
  }
`;
