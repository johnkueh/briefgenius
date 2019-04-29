import { GraphQLDateTime } from 'graphql-iso-date';

import userResolvers from './user';

const customScalarResolver = {
  DateTime: GraphQLDateTime
};

export default [customScalarResolver, userResolvers];
