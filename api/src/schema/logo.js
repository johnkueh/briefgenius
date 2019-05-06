import { gql } from 'apollo-server-express';
import { rule, shield, and, or, not } from 'graphql-shield';
import ValidationErrors from '../helpers/validation-errors';

export default gql`
  extend type Mutation {
    deleteLogo(assetId: String!): Logo! @requireAuth
  }
`;

const userOwnLogo = rule()(async (parent, args, ctx, info) => {
  const { id } = args;
  const { user, prisma } = ctx;

  const forms = await prisma.logo({
    where: {
      id,
      user: {
        id: user.id
      }
    }
  });

  if (forms.length > 0) return true;

  return ValidationErrors({
    auth: 'Not authorised!'
  });
});

export const permissions = shield({
  Mutation: {
    // deleteLogo: userOwnLogo
  }
});
