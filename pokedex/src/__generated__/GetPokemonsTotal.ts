/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetPokemonsTotal
// ====================================================

export interface GetPokemonsTotal_summary_aggregate {
  __typename: "pokemon_v2_pokemon_aggregate_fields";
  count: number;
}

export interface GetPokemonsTotal_summary {
  __typename: "pokemon_v2_pokemon_aggregate";
  aggregate: GetPokemonsTotal_summary_aggregate | null;
}

export interface GetPokemonsTotal {
  /**
   * fetch aggregated fields from the table: "pokemon_v2_pokemon"
   */
  summary: GetPokemonsTotal_summary;
}
