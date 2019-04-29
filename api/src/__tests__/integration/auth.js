import { createTestClient } from 'apollo-server-testing';
import { ApolloServer } from 'apollo-server-express';
import dotenv from 'dotenv';
import { prisma } from '../../../generated/prisma-client';
import typeDefs from '../../schema';
import resolvers from '../../resolvers';
import schemaDirectives from '../../directives';
import { ME, UPDATE_USER, DELETE_USER } from '../../queries/user';

dotenv.config({ path: '.env.test' });

let client;

beforeAll(async () => {
  const server = await new ApolloServer({
    typeDefs,
    resolvers,
    schemaDirectives,
    context: async ({ req }) => {
      const user = null;

      return {
        prisma,
        user
      };
    }
  });

  client = createTestClient(server);
});

const errorMessage = 'You must be authenticated to perform this action';

describe('unauthenticated requests', () => {
  it('shows authentication error for ME', async () => {
    const res = await client.query({ query: ME });
    expect(res.errors[0].message).toBe(errorMessage);
  });

  it('shows authentication error for UPDATE_USER', async () => {
    const res = await client.query({
      query: UPDATE_USER,
      variables: {
        input: {
          name: 'Test User',
          email: 'test@user.com',
          password: 'testpassword'
        }
      }
    });
    expect(res.errors[0].message).toBe(errorMessage);
  });

  it('shows authentication error for DELETE_USER', async () => {
    const res = await client.query({ query: DELETE_USER });
    expect(res.errors[0].message).toBe(errorMessage);
  });
});
