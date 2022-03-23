/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetPokemon
// ====================================================

export interface GetPokemon_pokemon_others_descriptions {
  __typename: "pokemon_v2_pokemonspeciesflavortext";
  description: string;
}

export interface GetPokemon_pokemon_others {
  __typename: "pokemon_v2_pokemonspecies";
  /**
   * An array relationship
   */
  descriptions: GetPokemon_pokemon_others_descriptions[];
}

export interface GetPokemon_pokemon_specy_eggGroups_eggGroup {
  __typename: "pokemon_v2_egggroup";
  name: string;
}

export interface GetPokemon_pokemon_specy_eggGroups {
  __typename: "pokemon_v2_pokemonegggroup";
  /**
   * An object relationship
   */
  eggGroup: GetPokemon_pokemon_specy_eggGroups_eggGroup | null;
}

export interface GetPokemon_pokemon_specy {
  __typename: "pokemon_v2_pokemonspecies";
  genderRate: number | null;
  eggCycyle: number | null;
  /**
   * An array relationship
   */
  eggGroups: GetPokemon_pokemon_specy_eggGroups[];
}

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

export interface GetPokemon_pokemon {
  __typename: "pokemon_v2_pokemon";
  weight: number | null;
  height: number | null;
  /**
   * An object relationship
   */
  others: GetPokemon_pokemon_others | null;
  /**
   * An object relationship
   */
  specy: GetPokemon_pokemon_specy | null;
  id: number;
  name: string;
  /**
   * An array relationship
   */
  types: GetPokemon_pokemon_types[];
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
