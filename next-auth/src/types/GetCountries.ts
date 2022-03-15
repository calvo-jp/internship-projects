/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetCountries
// ====================================================

export interface GetCountries_countries_continent {
  __typename: "Continent";
  name: string;
}

export interface GetCountries_countries {
  __typename: "Country";
  code: string;
  name: string;
  emoji: string;
  continent: GetCountries_countries_continent;
}

export interface GetCountries {
  countries: GetCountries_countries[];
}
