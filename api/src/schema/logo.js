import { gql } from 'apollo-server-express';
import { rule, shield, and, or, not } from 'graphql-shield';
import ValidationErrors from '../helpers/validation-errors';

export default gql`
  extend type Mutation {
    deleteLogo(assetId: String!): Logo! @requireAuth
  }
`;

const ownLogo = rule()(async (parent, args, ctx, info) => {
  const { assetId } = args;
  const { user, prisma } = ctx;

  const result = await prisma.$exists.logo({
    assetId,
    form: {
      user: {
        id: user.id
      }
    }
  });

  if (result) return true;

  return ValidationErrors({
    auth: 'Not authorised!'
  });
});

export const permissions = shield({
  Mutation: {
    deleteLogo: ownLogo
  }
});
