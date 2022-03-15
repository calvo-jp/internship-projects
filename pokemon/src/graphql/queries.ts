import { gql } from "@apollo/client";

const CORE_POKEMON_DATA = gql`
  fragment CorePokemonData on pokemon_v2_pokemon {
    id
    name
    sprites: pokemon_v2_pokemonsprites {
      sprites
    }
  }
`;

export const GET_POKEMONS = gql`
  query GetPokemons($limit: Int, $offset: Int) {
    pokemons: pokemon_v2_pokemon(limit: $limit, offset: $offset) {
      abilities: pokemon_v2_pokemonabilities_aggregate {
        aggregate {
          count
        }
      }
      moves: pokemon_v2_pokemonmoves_aggregate {
        aggregate {
          count
        }
      }
      types: pokemon_v2_pokemontypes_aggregate {
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
    pokemon: pokemon_v2_pokemon_by_pk(id: $id) {
      types: pokemon_v2_pokemontypes {
        id
        type: pokemon_v2_type {
          name
        }
      }
      abilities: pokemon_v2_pokemonabilities {
        id
        ability: pokemon_v2_ability {
          name
        }
      }
      stats: pokemon_v2_pokemonstats {
        id
        stat: pokemon_v2_stat {
          name
        }
        value: base_stat
      }
      moves: pokemon_v2_pokemonmoves(limit: 25) {
        id
        move: pokemon_v2_move {
          name
        }
      }

      ...CorePokemonData
    }
  }

  ${CORE_POKEMON_DATA}
`;
