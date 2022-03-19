import { gql } from "@apollo/client";

export const AUTHENTICATE = gql`
  mutation Authenticate($email: EmailAddress!, $password: String!) {
    authenticate(input: { emailAddress: $email, password: $password }) {
      token
    }
  }
`;

export const SIGN_UP = gql`
  mutation SignUp(
    $firstName: String!
    $lastName: String!
    $email: EmailAddress!
    $password: String!
  ) {
    signUp(
      input: {
        firstname: $firstName
        lastname: $lastName
        emailAddress: $email
        password: $password
      }
    ) {
      token
    }
  }
`;
