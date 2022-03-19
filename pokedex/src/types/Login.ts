/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { AuthenticateInput } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: Login
// ====================================================

export interface Login_authenticate {
  __typename: "Authentication";
  token: string;
}

export interface Login {
  /**
   * ### Description
   * Authenticate a user to get an access token if credentials are valid.
   * 
   * ### Error Codes
   * `BAD_USER_INPUT` - Invalid credentials.
   */
  authenticate: Login_authenticate;
}

export interface LoginVariables {
  input: AuthenticateInput;
}
