import { gql } from "@apollo/client";

const CORE_POKEMON_DATA = gql`
  fragment CorePokemonData on pokemon_v2_pokemon {
    id
    name
    pokemon_v2_pokemonsprites {
      sprites
    }
  }
`;

export const GET_POKEMONS = gql`
  query GetPokemons {
    pokemon_v2_pokemon {
      pokemon_v2_pokemonabilities_aggregate {
        aggregate {
          count
        }
      }
      pokemon_v2_pokemonmoves_aggregate {
        aggregate {
          count
        }
      }
      pokemon_v2_pokemontypes_aggregate {
        aggregate {
          count
        }
      }
      ...CorePokemonData
    }
  }

  ${CORE_POKEMON_DATA}
`;

export const GET_POKEMON = gql`
  query GetPokemon($id: Int!) {
    pokemon_v2_pokemon_by_pk(id: $id) {
      pokemon_v2_pokemontypes {
        id
        pokemon_v2_type {
          name
        }
      }
      pokemon_v2_pokemonabilities {
        id
        pokemon_v2_ability {
          name
        }
      }
      pokemon_v2_pokemonstats {
        id
        base_stat
        pokemon_v2_stat {
          name
        }
      }
      pokemon_v2_pokemonmoves(limit: 25) {
        id
        pokemon_v2_move {
          name
        }
      }

      ...CorePokemonData
    }
  }

  ${CORE_POKEMON_DATA}
`;
