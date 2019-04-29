import dotenv from 'dotenv';
import express from 'express';
import { ApolloServer, gql } from 'apollo-server-express';
import jwt from 'express-jwt';
import bodyParser from 'body-parser';
import { prisma } from '../generated/prisma-client';
import typeDefs from './schema';
import resolvers from './resolvers';
import schemaDirectives from './directives';

const envFile = process.env.NODE_ENV === 'test' ? '.env.test' : '.env';
dotenv.config({ path: envFile });

const app = express();

app.use(
  jwt({ secret: process.env.JWT_SECRET, credentialsRequired: false }),
  // https://github.com/auth0/express-jwt/issues/194
  (err, req, res, next) => {
    if (err.code === 'invalid_token') return next();
    return next(err);
  }
);

const server = new ApolloServer({
  typeDefs,
  resolvers,
  schemaDirectives,
  context: async ({ req }) => {
    let user = null;
    if (req) {
      if (req.user) {
        user = await prisma.user({ id: req.user.id });
      }
    }

    return {
      prisma,
      user
    };
  }
});

server.applyMiddleware({ app });

app.use(bodyParser.raw({ type: '*/*' }));

app.listen({ port: 8000 }, () => {
  console.log('Apollo Server on http://localhost:8000/graphql');
});
