import { gql } from "@apollo/client";

export const LOGIN = gql`
  mutation Login($input: AuthenticateInput!) {
    authenticate(input: $input) {
      token
    }
  }
`;

export const CREATE_ACCOUNT = gql`
  mutation CreateAccount($input: SignUpInput!) {
    signUp(input: $input) {
      token
    }
  }
`;
