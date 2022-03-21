/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: ResetPassword
// ====================================================

export interface ResetPassword_resetPassword {
  __typename: "Authentication";
  token: string;
}

export interface ResetPassword {
  /**
   * Reset password.
   */
  resetPassword: ResetPassword_resetPassword;
}

export interface ResetPasswordVariables {
  newPassword: string;
  code: string;
}
