/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetPokemonMoves
// ====================================================

export interface GetPokemonMoves_pokemon_main_move {
  __typename: "pokemon_v2_ability";
  name: string;
}

export interface GetPokemonMoves_pokemon_main {
  __typename: "pokemon_v2_pokemonability";
  id: number;
  /**
   * An object relationship
   */
  move: GetPokemonMoves_pokemon_main_move | null;
}

export interface GetPokemonMoves_pokemon_quick_move {
  __typename: "pokemon_v2_move";
  name: string;
}

export interface GetPokemonMoves_pokemon_quick {
  __typename: "pokemon_v2_pokemonmove";
  id: number;
  /**
   * An object relationship
   */
  move: GetPokemonMoves_pokemon_quick_move | null;
}

export interface GetPokemonMoves_pokemon {
  __typename: "pokemon_v2_pokemon";
  /**
   * An array relationship
   */
  main: GetPokemonMoves_pokemon_main[];
  /**
   * An array relationship
   */
  quick: GetPokemonMoves_pokemon_quick[];
}

export interface GetPokemonMoves {
  /**
   * fetch data from the table: "pokemon_v2_pokemon" using primary key columns
   */
  pokemon: GetPokemonMoves_pokemon | null;
}

export interface GetPokemonMovesVariables {
  id: number;
}
