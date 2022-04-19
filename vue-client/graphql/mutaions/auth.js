import { gql } from "graphql-tag";

export const LOGIN = gql`
  mutation login($input: LoginInput!) {
    login(input: $input) {
      id
      userName
      email
      profilePicture
      token
    }
  }
`;

export const REGISTER = gql`
  mutation register($input: RegisterInput!) {
    register(input: $input) {
      id
      userName
      email
      profilePicture
      token
    }
  }
`;
