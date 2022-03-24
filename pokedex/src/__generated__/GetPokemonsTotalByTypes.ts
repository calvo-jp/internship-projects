/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetPokemonsTotalByTypes
// ====================================================

export interface GetPokemonsTotalByTypes_summary_aggregate {
  __typename: "pokemon_v2_pokemon_aggregate_fields";
  count: number;
}

export interface GetPokemonsTotalByTypes_summary {
  __typename: "pokemon_v2_pokemon_aggregate";
  aggregate: GetPokemonsTotalByTypes_summary_aggregate | null;
}

export interface GetPokemonsTotalByTypes {
  /**
   * fetch aggregated fields from the table: "pokemon_v2_pokemon"
   */
  summary: GetPokemonsTotalByTypes_summary;
}

export interface GetPokemonsTotalByTypesVariables {
  types?: string[] | null;
}
