/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetPokemon
// ====================================================

export interface GetPokemon_pokemon_types_type {
  __typename: "pokemon_v2_type";
  name: string;
}

export interface GetPokemon_pokemon_types {
  __typename: "pokemon_v2_pokemontype";
  id: number;
  /**
   * An object relationship
   */
  type: GetPokemon_pokemon_types_type | null;
}

export interface GetPokemon_pokemon_abilities_ability {
  __typename: "pokemon_v2_ability";
  name: string;
}

export interface GetPokemon_pokemon_abilities {
  __typename: "pokemon_v2_pokemonability";
  id: number;
  /**
   * An object relationship
   */
  ability: GetPokemon_pokemon_abilities_ability | null;
}

export interface GetPokemon_pokemon_stats_stat {
  __typename: "pokemon_v2_stat";
  name: string;
}

export interface GetPokemon_pokemon_stats {
  __typename: "pokemon_v2_pokemonstat";
  id: number;
  /**
   * An object relationship
   */
  stat: GetPokemon_pokemon_stats_stat | null;
  value: number;
}

export interface GetPokemon_pokemon_moves_move {
  __typename: "pokemon_v2_move";
  name: string;
}

export interface GetPokemon_pokemon_moves {
  __typename: "pokemon_v2_pokemonmove";
  id: number;
  /**
   * An object relationship
   */
  move: GetPokemon_pokemon_moves_move | null;
}

export interface GetPokemon_pokemon_sprites {
  __typename: "pokemon_v2_pokemonsprites";
  sprites: string;
}

export interface GetPokemon_pokemon {
  __typename: "pokemon_v2_pokemon";
  /**
   * An array relationship
   */
  types: GetPokemon_pokemon_types[];
  /**
   * An array relationship
   */
  abilities: GetPokemon_pokemon_abilities[];
  /**
   * An array relationship
   */
  stats: GetPokemon_pokemon_stats[];
  /**
   * An array relationship
   */
  moves: GetPokemon_pokemon_moves[];
  id: number;
  name: string;
  /**
   * An array relationship
   */
  sprites: GetPokemon_pokemon_sprites[];
}

export interface GetPokemon {
  /**
   * fetch data from the table: "pokemon_v2_pokemon" using primary key columns
   */
  pokemon: GetPokemon_pokemon | null;
}

export interface GetPokemonVariables {
  id: number;
}
