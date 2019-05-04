import { gql } from 'apollo-server-express';

export default gql`
  extend type Query {
    Me: User @requireAuth
  }

  extend type Mutation {
    Signup(input: SignupInput!): AuthPayload!
    Login(input: LoginInput!): AuthPayload!
    ForgotPassword(input: ForgotPasswordInput!): Result
    ResetPassword(input: ResetPasswordInput!): Result
    UpdateUser(input: UpdateUserInput!): User! @requireAuth
    DeleteUser: User! @requireAuth
  }

  input SignupInput {
    name: String!
    email: String!
    password: String!
  }

  input LoginInput {
    email: String!
    password: String!
  }

  input ForgotPasswordInput {
    email: String!
  }

  input ResetPasswordInput {
    password: String
    token: String
  }

  input UpdateUserInput {
    name: String
    email: String
    password: String
  }

  type AuthPayload {
    jwt: String!
    user: User!
  }

  type Result {
    message: String
  }

  type User {
    id: String
    name: String
    email: String
    createdAt: DateTime
    updatedAt: DateTime
  }
`;
