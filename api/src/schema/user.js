import { gql } from 'apollo-server-express';
import * as yup from 'yup';

export default gql`
  extend type Query {
    me: User @requireAuth
  }

  extend type Mutation {
    signup(input: SignupInput!): AuthPayload! @validateInput
    login(input: LoginInput!): AuthPayload! @validateInput
    forgotPassword(input: ForgotPasswordInput!): Result @validateInput
    resetPassword(input: ResetPasswordInput!): Result @validateInput
    updateUser(input: UpdateUserInput!): User! @requireAuth @validateInput
    deleteUser: User! @requireAuth
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
  signup: yup.object().shape({
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
  login: yup.object().shape({
    email: yup
      .string()
      .email()
      .min(1),
    password: yup.string().min(6)
  }),
  forgotPassword: yup.object().shape({
    email: yup
      .string()
      .email()
      .min(1)
  }),
  resetPassword: yup.object().shape({
    token: yup.string().required('Password reset token is missing.'),
    password: yup
      .string()
      .required()
      .min(6)
  }),
  updateUser: yup.object().shape({
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
