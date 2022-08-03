import { gql } from '@apollo/client';

export const REGISTER_USER = gql`
  mutation registerUser($input: RegisterInput!) {
    register(input: $input) {
      username
      email
      id
      token
    }
  }
`;

export const LOGIN_USER = gql`
  mutation loginUser($input: LoginInput!) {
    login(input: $input) {
      username
      email
      id
      token
    }
  }
`;
