/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: CorePokemonData
// ====================================================

export interface CorePokemonData_pokemon_v2_pokemonsprites {
  __typename: "pokemon_v2_pokemonsprites";
  sprites: string;
}

export interface CorePokemonData {
  __typename: "pokemon_v2_pokemon";
  id: number;
  name: string;
  /**
   * An array relationship
   */
  pokemon_v2_pokemonsprites: CorePokemonData_pokemon_v2_pokemonsprites[];
}
