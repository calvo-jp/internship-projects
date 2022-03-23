/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetPokemonMoves
// ====================================================

export interface GetPokemonMoves_moves_quick_move {
  __typename: "pokemon_v2_ability";
  name: string;
}

export interface GetPokemonMoves_moves_quick {
  __typename: "pokemon_v2_pokemonability";
  id: number;
  /**
   * An object relationship
   */
  move: GetPokemonMoves_moves_quick_move | null;
}

export interface GetPokemonMoves_moves_main_move_effects_effect {
  __typename: "pokemon_v2_moveeffecteffecttext";
  effect: string;
}

export interface GetPokemonMoves_moves_main_move_effects {
  __typename: "pokemon_v2_moveeffect";
  /**
   * An array relationship
   */
  effect: GetPokemonMoves_moves_main_move_effects_effect[];
}

export interface GetPokemonMoves_moves_main_move {
  __typename: "pokemon_v2_move";
  name: string;
  power: number | null;
  pp: number | null;
  /**
   * An object relationship
   */
  effects: GetPokemonMoves_moves_main_move_effects | null;
}

export interface GetPokemonMoves_moves_main {
  __typename: "pokemon_v2_pokemonmove";
  id: number;
  /**
   * An object relationship
   */
  move: GetPokemonMoves_moves_main_move | null;
}

export interface GetPokemonMoves_moves {
  __typename: "pokemon_v2_pokemon";
  id: number;
  /**
   * An array relationship
   */
  quick: GetPokemonMoves_moves_quick[];
  /**
   * An array relationship
   */
  main: GetPokemonMoves_moves_main[];
}

export interface GetPokemonMoves {
  /**
   * fetch data from the table: "pokemon_v2_pokemon" using primary key columns
   */
  moves: GetPokemonMoves_moves | null;
}

export interface GetPokemonMovesVariables {
  id: number;
}
