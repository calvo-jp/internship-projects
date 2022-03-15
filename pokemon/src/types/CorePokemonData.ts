/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: CorePokemonData
// ====================================================

export interface CorePokemonData_sprites {
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
  sprites: CorePokemonData_sprites[];
}
