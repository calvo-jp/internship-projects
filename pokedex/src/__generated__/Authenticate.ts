/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: Authenticate
// ====================================================

export interface Authenticate_authenticate {
  __typename: "Authentication";
  token: string;
}

export interface Authenticate {
  /**
   * ### Description
   * Authenticate a user to get an access token if credentials are valid.
   * 
   * ### Error Codes
   * `BAD_USER_INPUT` - Invalid credentials.
   */
  authenticate: Authenticate_authenticate;
}

export interface AuthenticateVariables {
  email: any;
  password: string;
}
