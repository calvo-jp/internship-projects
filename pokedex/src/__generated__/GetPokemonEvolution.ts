/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetPokemonEvolution
// ====================================================

export interface GetPokemonEvolution_pokemon_specy_evolutionChain_evolutions {
  __typename: "pokemon_v2_pokemonspecies";
  id: number;
  name: string;
  evolvesFromSpeciesId: number | null;
}

export interface GetPokemonEvolution_pokemon_specy_evolutionChain {
  __typename: "pokemon_v2_evolutionchain";
  /**
   * An array relationship
   */
  evolutions: GetPokemonEvolution_pokemon_specy_evolutionChain_evolutions[];
}

export interface GetPokemonEvolution_pokemon_specy {
  __typename: "pokemon_v2_pokemonspecies";
  /**
   * An object relationship
   */
  evolutionChain: GetPokemonEvolution_pokemon_specy_evolutionChain | null;
}

export interface GetPokemonEvolution_pokemon {
  __typename: "pokemon_v2_pokemon";
  /**
   * An object relationship
   */
  specy: GetPokemonEvolution_pokemon_specy | null;
}

export interface GetPokemonEvolution {
  /**
   * fetch data from the table: "pokemon_v2_pokemon" using primary key columns
   */
  pokemon: GetPokemonEvolution_pokemon | null;
}

export interface GetPokemonEvolutionVariables {
  id: number;
}
