/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetPokemon
// ====================================================

export interface GetPokemon_pokemon_species_pokemon_v2_pokemonspeciesflavortexts {
  __typename: "pokemon_v2_pokemonspeciesflavortext";
  id: number;
  flavor_text: string;
}

export interface GetPokemon_pokemon_species_eggGroups_eggGroup {
  __typename: "pokemon_v2_egggroup";
  name: string;
}

export interface GetPokemon_pokemon_species_eggGroups {
  __typename: "pokemon_v2_pokemonegggroup";
  id: number;
  /**
   * An object relationship
   */
  eggGroup: GetPokemon_pokemon_species_eggGroups_eggGroup | null;
}

export interface GetPokemon_pokemon_species_color {
  __typename: "pokemon_v2_pokemoncolor";
  id: number;
  name: string;
}

export interface GetPokemon_pokemon_species_descriptions {
  __typename: "pokemon_v2_pokemonspeciesdescription";
  id: number;
  description: string;
}

export interface GetPokemon_pokemon_species_pokemon_v2_generation {
  __typename: "pokemon_v2_generation";
  name: string;
}

export interface GetPokemon_pokemon_species {
  __typename: "pokemon_v2_pokemonspecies";
  id: number;
  name: string;
  /**
   * An array relationship
   */
  pokemon_v2_pokemonspeciesflavortexts: GetPokemon_pokemon_species_pokemon_v2_pokemonspeciesflavortexts[];
  /**
   * An array relationship
   */
  eggGroups: GetPokemon_pokemon_species_eggGroups[];
  /**
   * An object relationship
   */
  color: GetPokemon_pokemon_species_color | null;
  /**
   * An array relationship
   */
  descriptions: GetPokemon_pokemon_species_descriptions[];
  /**
   * An object relationship
   */
  pokemon_v2_generation: GetPokemon_pokemon_species_pokemon_v2_generation | null;
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
  species: GetPokemon_pokemon_species | null;
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
