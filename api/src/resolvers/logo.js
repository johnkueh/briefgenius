export default {
  Mutation: {
    async deleteLogo(parent, { assetId }, { user, prisma }, info) {
      return prisma.deleteLogo({ assetId });
    }
  }
};
