/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { SignUpInput } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: CreateAccount
// ====================================================

export interface CreateAccount_signUp {
  __typename: "Authentication";
  token: string;
}

export interface CreateAccount {
  /**
   * ### Description
   * Sign up a user and get an access token if successful.
   * 
   * ### Error Codes
   * `BAD_USER_INPUT` - Email address already used.
   */
  signUp: CreateAccount_signUp;
}

export interface CreateAccountVariables {
  input: SignUpInput;
}
