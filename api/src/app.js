import dotenv from 'dotenv';
import express from 'express';
import jwt from 'express-jwt';
import { ApolloServer } from 'apollo-server-express';
import { makeExecutableSchema } from 'graphql-tools';
import { applyMiddleware } from 'graphql-middleware';
import typeDefs, { validationSchema } from './schema';
import resolvers from './resolvers';
import schemaDirectives from './directives';
import { validations } from './middlewares/validations';
import { permissions } from './middlewares/permissions';

const envFile = process.env.NODE_ENV ? `.env.${process.env.NODE_ENV}` : '.env';
dotenv.config({ path: envFile });
const { prisma: prismaClient } = require('../generated/prisma-client');

export const prisma = prismaClient;
export const app = express();

app.use(
  // https://github.com/auth0/express-jwt/issues/194
  jwt({ secret: process.env.JWT_SECRET, credentialsRequired: false }),
  (err, req, res, next) => {
    if (err.code === 'invalid_token') return next();
    return next(err);
  }
);

const schema = applyMiddleware(
  makeExecutableSchema({ typeDefs, resolvers, schemaDirectives }),
  ...permissions,
  validations
);

const server = new ApolloServer({
  schema,
  context: async ({ req }) => {
    let user = null;
    if (req) {
      if (req.user) {
        user = await prismaClient.user({ id: req.user.id });
      }
    }

    return {
      validationSchema,
      prisma: prismaClient,
      user
    };
  }
});

server.applyMiddleware({ app });

export default {
  app,
  prisma
};
