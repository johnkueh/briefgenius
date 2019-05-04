import { gql } from 'apollo-server-express';
import * as yup from 'yup';

export default gql`
  extend type Query {
    Me: User @requireAuth
  }

  extend type Mutation {
    Signup(input: SignupInput!): AuthPayload! @validateInput
    Login(input: LoginInput!): AuthPayload! @validateInput
    ForgotPassword(input: ForgotPasswordInput!): Result @validateInput
    ResetPassword(input: ResetPasswordInput!): Result @validateInput
    UpdateUser(input: UpdateUserInput!): User! @requireAuth @validateInput
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
    password: String!
    repeatPassword: String!
    token: String!
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

export const validations = {
  Signup: yup.object().shape({
    name: yup
      .string()
      .min(1)
      .max(15),
    email: yup
      .string()
      .email()
      .min(1),
    password: yup.string().min(6)
  }),
  Login: yup.object().shape({
    email: yup
      .string()
      .email()
      .min(1),
    password: yup.string().min(6)
  }),
  ForgotPassword: yup.object().shape({
    email: yup
      .string()
      .email()
      .min(1)
  }),
  ResetPassword: yup.object().shape({
    token: yup.string().required('Password reset token is missing.'),
    password: yup
      .string()
      .required()
      .min(6)
  }),
  UpdateUser: yup.object().shape({
    name: yup
      .string()
      .min(1)
      .max(15),
    email: yup
      .string()
      .email()
      .min(1),
    password: yup.string().min(6)
  })
};
