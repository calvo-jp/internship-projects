/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: CorePokemonDetails
// ====================================================

export interface CorePokemonDetails_types_type {
  __typename: "pokemon_v2_type";
  name: string;
}

export interface CorePokemonDetails_types {
  __typename: "pokemon_v2_pokemontype";
  id: number;
  /**
   * An object relationship
   */
  type: CorePokemonDetails_types_type | null;
}

export interface CorePokemonDetails {
  __typename: "pokemon_v2_pokemon";
  id: number;
  name: string;
  /**
   * An array relationship
   */
  types: CorePokemonDetails_types[];
}
