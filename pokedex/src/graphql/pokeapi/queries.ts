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
  query GetPokemons($limit: Int, $offset: Int, $types: [String!]!) {
    pokemons: pokemon_v2_pokemon(
      limit: $limit
      offset: $offset
      order_by: { id: asc }
      where: {
        pokemon_v2_pokemontypes: { pokemon_v2_type: { name: { _in: $types } } }
      }
    ) {
      ...CorePokemonDetails
    }
  }

  ${CORE_POKEMON_DETAILS}
`;

export const GET_POKEMONS_TOTAL = gql`
  query GetPokemonsTotal($types: [String!]!) {
    summary: pokemon_v2_pokemon_aggregate(
      where: {
        pokemon_v2_pokemontypes: { pokemon_v2_type: { name: { _in: $types } } }
      }
    ) {
      aggregate {
        count(columns: id, distinct: true)
      }
    }
  }
`;

export const GET_POKEMON = gql`
  query GetPokemon($id: Int!) {
    pokemon: pokemon_v2_pokemon_by_pk(id: $id) {
      weight
      height

      others: pokemon_v2_pokemonspecy {
        descriptions: pokemon_v2_pokemonspeciesflavortexts(
          distinct_on: language_id
          where: { pokemon_v2_language: { name: { _eq: "en" } } }
        ) {
          description: flavor_text
        }
      }

      specy: pokemon_v2_pokemonspecy {
        genderRate: gender_rate
        eggCycyle: hatch_counter
        eggGroups: pokemon_v2_pokemonegggroups {
          eggGroup: pokemon_v2_egggroup {
            name
          }
        }
      }

      ...CorePokemonDetails
    }
  }

  ${CORE_POKEMON_DETAILS}
`;

export const GET_POKEMON_STATS = gql`
  query GetPokemonStats($id: Int!) {
    pokemon: pokemon_v2_pokemon_by_pk(id: $id) {
      id
      types: pokemon_v2_pokemontypes {
        type: pokemon_v2_type {
          id
        }
      }
      experience: base_experience
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
    moves: pokemon_v2_pokemon_by_pk(id: $id) {
      id
      quick: pokemon_v2_pokemonabilities {
        id
        move: pokemon_v2_ability {
          name
        }
      }

      main: pokemon_v2_pokemonmoves(
        distinct_on: move_id
        where: { pokemon_v2_move: { power: { _gt: 0 } } }
      ) {
        id

        move: pokemon_v2_move {
          name
          power
          pp
          effects: pokemon_v2_moveeffect {
            effect: pokemon_v2_moveeffecteffecttexts {
              effect
            }
          }
        }
      }
    }
  }
`;

export const GET_POKEMON_EVOLUTION = gql`
  query GetPokemonEvolution($id: Int!) {
    pokemon: pokemon_v2_pokemon_by_pk(id: $id) {
      id
      name
      specy: pokemon_v2_pokemonspecy {
        id
        name
        evolutionChain: pokemon_v2_evolutionchain {
          evolutions: pokemon_v2_pokemonspecies {
            id
            name
            evolvesFromSpeciesId: evolves_from_species_id
            evolvesWhen: pokemon_v2_pokemonevolutions {
              level: min_level
            }
          }
        }
      }
    }
  }
`;

/**
 *
 * fetches all pokemon types eg. fire, dragon, etc.
 *
 */
export const GET_POKEMON_TYPES = gql`
  query GetPokemonTypes {
    types: pokemon_v2_type {
      name
    }
  }
`;

/**
 *
 * fetches the types of a pokemon using its id
 *
 */
export const GET_POKEMON_TYPE = gql`
  query GetPokemonType($id: Int!) {
    pokemon: pokemon_v2_pokemon_by_pk(id: $id) {
      id
      types: pokemon_v2_pokemontypes {
        type: pokemon_v2_type {
          id
          name
        }
      }
    }
  }
`;
