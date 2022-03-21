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
  query GetPokemons {
    pokemon_v2_pokemon {
      ...CorePokemonDetails
    }
  }

  ${CORE_POKEMON_DETAILS}
`;
