import { gql } from 'apollo-server-express';

import userSchema, { validations as userValidations } from './user';

const linkSchema = gql`
  scalar DateTime

  directive @requireAuth on FIELD_DEFINITION
  directive @computed(value: String) on FIELD_DEFINITION
  directive @validateInput on FIELD_DEFINITION

  type Query {
    _: Boolean
  }
  type Mutation {
    _: Boolean
  }
  # type Subscription {
  #   _: Boolean
  # }
`;

export default [linkSchema, userSchema];

export const validationSchema = {
  ...userValidations
};
