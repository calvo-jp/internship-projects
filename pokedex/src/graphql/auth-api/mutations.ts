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

export const TRIGGER_PASSWORD_RESET = gql`
  mutation TriggerPasswordReset($email: EmailAddress!) {
    triggerPasswordReset(input: { emailAddress: $email })
  }
`;

export const RESET_PASSWORD = gql`
  mutation ResetPassword($newPassword: String!, $code: String!) {
    resetPassword(
      input: { newPassword: $newPassword, passwordResetCode: $code }
    ) {
      token
    }
  }
`;
