/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetPokemon
// ====================================================

export interface GetPokemon_pokemon_types_type {
  __typename: "pokemon_v2_type";
  name: string;
}

export interface GetPokemon_pokemon_types {
  __typename: "pokemon_v2_pokemontype";
  id: number;
  /**
   * An object relationship
   */
  type: GetPokemon_pokemon_types_type | null;
}

export interface GetPokemon_pokemon {
  __typename: "pokemon_v2_pokemon";
  id: number;
  name: string;
  /**
   * An array relationship
   */
  types: GetPokemon_pokemon_types[];
}

export interface GetPokemon {
  /**
   * fetch data from the table: "pokemon_v2_pokemon" using primary key columns
   */
  pokemon: GetPokemon_pokemon | null;
}

export interface GetPokemonVariables {
  id: number;
}
