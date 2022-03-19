import { gql } from "@apollo/client";

export const PROFILE = gql`
  query Profile {
    me {
      id
      firstname
      lastname
      emailAddress
      createdAt
      updatedAt
    }
  }
`;
