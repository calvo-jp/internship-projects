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
      ...CorePokemonDetails
    }
  }

  ${CORE_POKEMON_DETAILS}
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
      quick: pokemon_v2_pokemonabilities {
        id
        move: pokemon_v2_ability {
          name
        }
      }

      main: pokemon_v2_pokemonmoves(distinct_on: id) {
        id

        move: pokemon_v2_move {
          name
          power
          accuracy
        }
      }
    }
  }
`;

export const GET_POKEMON_EVOLUTION = gql`
  query GetPokemonEvolution($id: Int!) {
    pokemon: pokemon_v2_pokemon_by_pk(id: $id) {
      specy: pokemon_v2_pokemonspecy {
        evolutionChain: pokemon_v2_evolutionchain {
          evolutions: pokemon_v2_pokemonspecies {
            id
            name
            evolvesFromSpeciesId: evolves_from_species_id
          }
        }
      }
    }
  }
`;
