/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: SignUp
// ====================================================

export interface SignUp_signUp {
  __typename: "Authentication";
  token: string;
}

export interface SignUp {
  /**
   * ### Description
   * Sign up a user and get an access token if successful.
   * 
   * ### Error Codes
   * `BAD_USER_INPUT` - Email address already used.
   */
  signUp: SignUp_signUp;
}

export interface SignUpVariables {
  firstName: string;
  lastName: string;
  email: any;
  password: string;
}
