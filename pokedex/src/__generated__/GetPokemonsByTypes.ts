/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetPokemonsByTypes
// ====================================================

export interface GetPokemonsByTypes_pokemons_types_type {
  __typename: "pokemon_v2_type";
  name: string;
}

export interface GetPokemonsByTypes_pokemons_types {
  __typename: "pokemon_v2_pokemontype";
  id: number;
  /**
   * An object relationship
   */
  type: GetPokemonsByTypes_pokemons_types_type | null;
}

export interface GetPokemonsByTypes_pokemons {
  __typename: "pokemon_v2_pokemon";
  id: number;
  name: string;
  /**
   * An array relationship
   */
  types: GetPokemonsByTypes_pokemons_types[];
}

export interface GetPokemonsByTypes {
  /**
   * fetch data from the table: "pokemon_v2_pokemon"
   */
  pokemons: GetPokemonsByTypes_pokemons[];
}

export interface GetPokemonsByTypesVariables {
  limit?: number | null;
  offset?: number | null;
  types?: string[] | null;
}
