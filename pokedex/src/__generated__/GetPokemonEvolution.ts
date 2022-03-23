/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetPokemonEvolution
// ====================================================

export interface GetPokemonEvolution_pokemon_specy_evolutionChain_evolutions_evolvesWhen {
  __typename: "pokemon_v2_pokemonevolution";
  level: number | null;
}

export interface GetPokemonEvolution_pokemon_specy_evolutionChain_evolutions {
  __typename: "pokemon_v2_pokemonspecies";
  id: number;
  name: string;
  evolvesFromSpeciesId: number | null;
  /**
   * An array relationship
   */
  evolvesWhen: GetPokemonEvolution_pokemon_specy_evolutionChain_evolutions_evolvesWhen[];
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
  id: number;
  /**
   * An object relationship
   */
  evolutionChain: GetPokemonEvolution_pokemon_specy_evolutionChain | null;
}

export interface GetPokemonEvolution_pokemon {
  __typename: "pokemon_v2_pokemon";
  id: number;
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
