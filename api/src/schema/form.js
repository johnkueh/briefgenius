import { gql } from 'apollo-server-express';
import * as yup from 'yup';

export default gql`
  extend type Query {
    forms: [Form] @requireAuth
    form(id: String!): Form! @requireAuth
  }

  extend type Mutation {
    createForm(input: CreateFormInput!): Form! @requireAuth
    updateForm(input: UpdateFormInput!): Form! @requireAuth
    deleteForm(id: String!): Form! @requireAuth
  }

  input CreateFormInput {
    name: String!
  }

  input UpdateFormInput {
    id: String!
    name: String!
    logos: [String]
  }

  type Form {
    id: String
    name: String
    createdAt: DateTime!
    updatedAt: DateTime!
    logos: [Logo]
  }

  type Logo {
    id: String!
    assetId: String!
  }
`;

export const validations = {
  createForm: yup.object().shape({
    name: yup.string().min(1)
  }),
  updateForm: yup.object().shape({
    name: yup.string().min(1),
    logos: yup.array().of(yup.string().min(1))
  })
};
