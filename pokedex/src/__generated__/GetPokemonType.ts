/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetPokemonType
// ====================================================

export interface GetPokemonType_pokemon_types_type {
  __typename: "pokemon_v2_type";
  id: number;
  name: string;
}

export interface GetPokemonType_pokemon_types {
  __typename: "pokemon_v2_pokemontype";
  /**
   * An object relationship
   */
  type: GetPokemonType_pokemon_types_type | null;
}

export interface GetPokemonType_pokemon {
  __typename: "pokemon_v2_pokemon";
  id: number;
  /**
   * An array relationship
   */
  types: GetPokemonType_pokemon_types[];
}

export interface GetPokemonType {
  /**
   * fetch data from the table: "pokemon_v2_pokemon" using primary key columns
   */
  pokemon: GetPokemonType_pokemon | null;
}

export interface GetPokemonTypeVariables {
  id: number;
}
