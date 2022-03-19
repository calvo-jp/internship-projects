/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: Profile
// ====================================================

export interface Profile_me {
  __typename: "Account";
  id: any;
  firstname: string;
  lastname: string;
  emailAddress: any;
  createdAt: any;
  updatedAt: any;
}

export interface Profile {
  /**
   * Returns user's own information.
   */
  me: Profile_me;
}
