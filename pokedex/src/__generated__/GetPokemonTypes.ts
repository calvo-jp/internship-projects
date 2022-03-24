/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetPokemonTypes
// ====================================================

export interface GetPokemonTypes_pokemon_v2_type {
  __typename: "pokemon_v2_type";
  name: string;
}

export interface GetPokemonTypes {
  /**
   * fetch data from the table: "pokemon_v2_type"
   */
  pokemon_v2_type: GetPokemonTypes_pokemon_v2_type[];
}
