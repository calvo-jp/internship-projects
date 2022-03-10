/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetPokemons
// ====================================================

export interface GetPokemons_pokemons_abilities_aggregate {
  __typename: "pokemon_v2_pokemonability_aggregate_fields";
  count: number;
}

export interface GetPokemons_pokemons_abilities {
  __typename: "pokemon_v2_pokemonability_aggregate";
  aggregate: GetPokemons_pokemons_abilities_aggregate | null;
}

export interface GetPokemons_pokemons_moves_aggregate {
  __typename: "pokemon_v2_pokemonmove_aggregate_fields";
  count: number;
}

export interface GetPokemons_pokemons_moves {
  __typename: "pokemon_v2_pokemonmove_aggregate";
  aggregate: GetPokemons_pokemons_moves_aggregate | null;
}

export interface GetPokemons_pokemons_types_aggregate {
  __typename: "pokemon_v2_pokemontype_aggregate_fields";
  count: number;
}

export interface GetPokemons_pokemons_types {
  __typename: "pokemon_v2_pokemontype_aggregate";
  aggregate: GetPokemons_pokemons_types_aggregate | null;
}

export interface GetPokemons_pokemons_sprites {
  __typename: "pokemon_v2_pokemonsprites";
  sprites: string;
}

export interface GetPokemons_pokemons {
  __typename: "pokemon_v2_pokemon";
  /**
   * An aggregate relationship
   */
  abilities: GetPokemons_pokemons_abilities;
  /**
   * An aggregate relationship
   */
  moves: GetPokemons_pokemons_moves;
  /**
   * An aggregate relationship
   */
  types: GetPokemons_pokemons_types;
  id: number;
  name: string;
  /**
   * An array relationship
   */
  sprites: GetPokemons_pokemons_sprites[];
}

export interface GetPokemons {
  /**
   * fetch data from the table: "pokemon_v2_pokemon"
   */
  pokemons: GetPokemons_pokemons[];
}

export interface GetPokemonsVariables {
  limit?: number | null;
  offset?: number | null;
}
