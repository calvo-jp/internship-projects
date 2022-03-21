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
  query GetPokemons($limit: Int = 100, $offset: Int = 0) {
    pokemons: pokemon_v2_pokemon(limit: $limit, offset: $offset) {
      ...CorePokemonDetails
    }
  }

  ${CORE_POKEMON_DETAILS}
`;

export const GET_POKEMON = gql`
  query GetPokemon($id: Int!) {
    pokemon: pokemon_v2_pokemon_by_pk(id: $id) {
      weight
      height

      species: pokemon_v2_pokemonspecy {
        id
        name
        pokemon_v2_pokemonspeciesflavortexts {
          id
          flavor_text
        }
        eggGroups: pokemon_v2_pokemonegggroups {
          id
          eggGroup: pokemon_v2_egggroup {
            name
          }
        }
        color: pokemon_v2_pokemoncolor {
          id
          name
        }
        descriptions: pokemon_v2_pokemonspeciesdescriptions {
          id
          description
        }
        pokemon_v2_generation {
          name

        }
      }

      ...CorePokemonDetails
    }

    ${CORE_POKEMON_DETAILS}
  }
`;

export const GET_POKEMON_STATS = gql`
  query GetPokemonStats($id: Int!) {
    pokemon: pokemon_v2_pokemon_by_pk(id: $id) {
      stats: pokemon_v2_pokemonstats {
        id
        value: base_stat
        stat: pokemon_v2_stat {
          name
        }
      }
    }
  }
`;

export const GET_POKEMON_MOVES = gql`
  query GetPokemonMoves($id: Int!) {
    pokemon: pokemon_v2_pokemon_by_pk(id: $id) {
      main: pokemon_v2_pokemonabilities {
        id
        move: pokemon_v2_ability {
          name
        }
      }

      quick: pokemon_v2_pokemonmoves(distinct_on: id, limit: 9) {
        id
        move: pokemon_v2_move {
          name
        }
      }
    }
  }
`;
