import { GraphQLDateTime } from 'graphql-iso-date';

import userResolvers from './user';
import formResolvers from './form';

const customScalarResolver = {
  DateTime: GraphQLDateTime
};

export default [customScalarResolver, userResolvers, formResolvers];
