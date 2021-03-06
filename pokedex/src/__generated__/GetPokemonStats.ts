/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetPokemonStats
// ====================================================

export interface GetPokemonStats_pokemon_types_type {
  __typename: "pokemon_v2_type";
  id: number;
}

export interface GetPokemonStats_pokemon_types {
  __typename: "pokemon_v2_pokemontype";
  /**
   * An object relationship
   */
  type: GetPokemonStats_pokemon_types_type | null;
}

export interface GetPokemonStats_pokemon_stats_stat {
  __typename: "pokemon_v2_stat";
  name: string;
}

export interface GetPokemonStats_pokemon_stats {
  __typename: "pokemon_v2_pokemonstat";
  id: number;
  value: number;
  /**
   * An object relationship
   */
  stat: GetPokemonStats_pokemon_stats_stat | null;
}

export interface GetPokemonStats_pokemon {
  __typename: "pokemon_v2_pokemon";
  id: number;
  /**
   * An array relationship
   */
  types: GetPokemonStats_pokemon_types[];
  experience: number | null;
  /**
   * An array relationship
   */
  stats: GetPokemonStats_pokemon_stats[];
}

export interface GetPokemonStats {
  /**
   * fetch data from the table: "pokemon_v2_pokemon" using primary key columns
   */
  pokemon: GetPokemonStats_pokemon | null;
}

export interface GetPokemonStatsVariables {
  id: number;
}
