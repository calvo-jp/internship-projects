/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetPokemons
// ====================================================

export interface GetPokemons_pokemon_v2_pokemon_types_type {
  __typename: "pokemon_v2_type";
  name: string;
}

export interface GetPokemons_pokemon_v2_pokemon_types {
  __typename: "pokemon_v2_pokemontype";
  id: number;
  /**
   * An object relationship
   */
  type: GetPokemons_pokemon_v2_pokemon_types_type | null;
}

export interface GetPokemons_pokemon_v2_pokemon {
  __typename: "pokemon_v2_pokemon";
  id: number;
  name: string;
  /**
   * An array relationship
   */
  types: GetPokemons_pokemon_v2_pokemon_types[];
}

export interface GetPokemons {
  /**
   * fetch data from the table: "pokemon_v2_pokemon"
   */
  pokemon_v2_pokemon: GetPokemons_pokemon_v2_pokemon[];
}
