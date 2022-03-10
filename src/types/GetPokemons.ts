/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetPokemons
// ====================================================

export interface GetPokemons_pokemon_v2_pokemon_pokemon_v2_pokemonabilities_aggregate_aggregate {
  __typename: "pokemon_v2_pokemonability_aggregate_fields";
  count: number;
}

export interface GetPokemons_pokemon_v2_pokemon_pokemon_v2_pokemonabilities_aggregate {
  __typename: "pokemon_v2_pokemonability_aggregate";
  aggregate: GetPokemons_pokemon_v2_pokemon_pokemon_v2_pokemonabilities_aggregate_aggregate | null;
}

export interface GetPokemons_pokemon_v2_pokemon_pokemon_v2_pokemonmoves_aggregate_aggregate {
  __typename: "pokemon_v2_pokemonmove_aggregate_fields";
  count: number;
}

export interface GetPokemons_pokemon_v2_pokemon_pokemon_v2_pokemonmoves_aggregate {
  __typename: "pokemon_v2_pokemonmove_aggregate";
  aggregate: GetPokemons_pokemon_v2_pokemon_pokemon_v2_pokemonmoves_aggregate_aggregate | null;
}

export interface GetPokemons_pokemon_v2_pokemon_pokemon_v2_pokemontypes_aggregate_aggregate {
  __typename: "pokemon_v2_pokemontype_aggregate_fields";
  count: number;
}

export interface GetPokemons_pokemon_v2_pokemon_pokemon_v2_pokemontypes_aggregate {
  __typename: "pokemon_v2_pokemontype_aggregate";
  aggregate: GetPokemons_pokemon_v2_pokemon_pokemon_v2_pokemontypes_aggregate_aggregate | null;
}

export interface GetPokemons_pokemon_v2_pokemon_pokemon_v2_pokemonsprites {
  __typename: "pokemon_v2_pokemonsprites";
  sprites: string;
}

export interface GetPokemons_pokemon_v2_pokemon {
  __typename: "pokemon_v2_pokemon";
  /**
   * An aggregate relationship
   */
  pokemon_v2_pokemonabilities_aggregate: GetPokemons_pokemon_v2_pokemon_pokemon_v2_pokemonabilities_aggregate;
  /**
   * An aggregate relationship
   */
  pokemon_v2_pokemonmoves_aggregate: GetPokemons_pokemon_v2_pokemon_pokemon_v2_pokemonmoves_aggregate;
  /**
   * An aggregate relationship
   */
  pokemon_v2_pokemontypes_aggregate: GetPokemons_pokemon_v2_pokemon_pokemon_v2_pokemontypes_aggregate;
  id: number;
  name: string;
  /**
   * An array relationship
   */
  pokemon_v2_pokemonsprites: GetPokemons_pokemon_v2_pokemon_pokemon_v2_pokemonsprites[];
}

export interface GetPokemons {
  /**
   * fetch data from the table: "pokemon_v2_pokemon"
   */
  pokemon_v2_pokemon: GetPokemons_pokemon_v2_pokemon[];
}
