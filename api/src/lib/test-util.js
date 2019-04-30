import request from 'supertest';
import { app, prisma as prismaClient } from '../app';

export const graphqlRequest = async ({ variables, query, headers = {} }) => {
  const { body } = await request(app)
    .post('/graphql')
    .set(headers)
    .send({
      query,
      variables
    });

  expect(body).toHaveProperty('data');
  return body;
};

export const prisma = prismaClient;

export default {
  graphqlRequest,
  prisma
};
