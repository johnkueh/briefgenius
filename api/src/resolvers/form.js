import ValidationErrors from '../helpers/validation-errors';
import form from '../schema/form';

const fragment = `
  { 
    id 
    name 
    logos { 
      assetId 
    } 
  }
`;

export default {
  Query: {
    async forms(parent, args, { user, prisma }, info) {
      return prisma.forms({ where: { user: { id: user.id } } }).$fragment(fragment);
    },
    async form(parent, { id }, { user, prisma }, info) {
      return prisma.form({ id }).$fragment(fragment);
    }
  },
  Mutation: {
    async createForm(parent, { input }, { user, prisma }, info) {
      const { name } = input;
      return prisma
        .createForm({
          name,
          user: {
            connect: {
              id: user.id
            }
          }
        })
        .$fragment(fragment);
    }
  }
};
