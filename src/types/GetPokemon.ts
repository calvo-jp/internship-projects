/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetPokemon
// ====================================================

export interface GetPokemon_pokemon_v2_pokemon_by_pk_pokemon_v2_pokemontypes_pokemon_v2_type {
  __typename: "pokemon_v2_type";
  name: string;
}

export interface GetPokemon_pokemon_v2_pokemon_by_pk_pokemon_v2_pokemontypes {
  __typename: "pokemon_v2_pokemontype";
  id: number;
  /**
   * An object relationship
   */
  pokemon_v2_type: GetPokemon_pokemon_v2_pokemon_by_pk_pokemon_v2_pokemontypes_pokemon_v2_type | null;
}

export interface GetPokemon_pokemon_v2_pokemon_by_pk_pokemon_v2_pokemonabilities_pokemon_v2_ability {
  __typename: "pokemon_v2_ability";
  name: string;
}

export interface GetPokemon_pokemon_v2_pokemon_by_pk_pokemon_v2_pokemonabilities {
  __typename: "pokemon_v2_pokemonability";
  id: number;
  /**
   * An object relationship
   */
  pokemon_v2_ability: GetPokemon_pokemon_v2_pokemon_by_pk_pokemon_v2_pokemonabilities_pokemon_v2_ability | null;
}

export interface GetPokemon_pokemon_v2_pokemon_by_pk_pokemon_v2_pokemonstats_pokemon_v2_stat {
  __typename: "pokemon_v2_stat";
  name: string;
}

export interface GetPokemon_pokemon_v2_pokemon_by_pk_pokemon_v2_pokemonstats {
  __typename: "pokemon_v2_pokemonstat";
  id: number;
  base_stat: number;
  /**
   * An object relationship
   */
  pokemon_v2_stat: GetPokemon_pokemon_v2_pokemon_by_pk_pokemon_v2_pokemonstats_pokemon_v2_stat | null;
}

export interface GetPokemon_pokemon_v2_pokemon_by_pk_pokemon_v2_pokemonmoves_pokemon_v2_move {
  __typename: "pokemon_v2_move";
  name: string;
}

export interface GetPokemon_pokemon_v2_pokemon_by_pk_pokemon_v2_pokemonmoves {
  __typename: "pokemon_v2_pokemonmove";
  id: number;
  /**
   * An object relationship
   */
  pokemon_v2_move: GetPokemon_pokemon_v2_pokemon_by_pk_pokemon_v2_pokemonmoves_pokemon_v2_move | null;
}

export interface GetPokemon_pokemon_v2_pokemon_by_pk_pokemon_v2_pokemonsprites {
  __typename: "pokemon_v2_pokemonsprites";
  sprites: string;
}

export interface GetPokemon_pokemon_v2_pokemon_by_pk {
  __typename: "pokemon_v2_pokemon";
  /**
   * An array relationship
   */
  pokemon_v2_pokemontypes: GetPokemon_pokemon_v2_pokemon_by_pk_pokemon_v2_pokemontypes[];
  /**
   * An array relationship
   */
  pokemon_v2_pokemonabilities: GetPokemon_pokemon_v2_pokemon_by_pk_pokemon_v2_pokemonabilities[];
  /**
   * An array relationship
   */
  pokemon_v2_pokemonstats: GetPokemon_pokemon_v2_pokemon_by_pk_pokemon_v2_pokemonstats[];
  /**
   * An array relationship
   */
  pokemon_v2_pokemonmoves: GetPokemon_pokemon_v2_pokemon_by_pk_pokemon_v2_pokemonmoves[];
  id: number;
  name: string;
  /**
   * An array relationship
   */
  pokemon_v2_pokemonsprites: GetPokemon_pokemon_v2_pokemon_by_pk_pokemon_v2_pokemonsprites[];
}

export interface GetPokemon {
  /**
   * fetch data from the table: "pokemon_v2_pokemon" using primary key columns
   */
  pokemon_v2_pokemon_by_pk: GetPokemon_pokemon_v2_pokemon_by_pk | null;
}

export interface GetPokemonVariables {
  id: number;
}
