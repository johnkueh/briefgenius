import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import { createTestClient } from 'apollo-server-testing';
import { ApolloServer } from 'apollo-server-express';
import sgMail from '@sendgrid/mail';
import typeDefs from '../../schema';
import resolvers from '../../resolvers';
import schemaDirectives from '../../directives';
import {
  ME,
  SIGNUP,
  LOGIN,
  UPDATE_USER,
  FORGOT_PASSWORD,
  RESET_PASSWORD,
  DELETE_USER
} from '../../queries/user';

dotenv.config({ path: '.env.test' });
const { prisma } = require('../../../generated/prisma-client');

let user;
let client;

beforeEach(async () => {
  await prisma.deleteManyUsers();

  user = await prisma.createUser({
    id: 'A-HASHED-ID',
    name: 'Test User',
    email: 'test+user@test.com',
    password: bcrypt.hashSync('testpassword', 10),
    resetPasswordToken: 'RESET-PASSWORD-TOKEN'
  });

  const server = await new ApolloServer({
    typeDefs,
    resolvers,
    schemaDirectives,
    context: async ({ req }) => {
      return {
        prisma,
        user
      };
    }
  });

  client = createTestClient(server);
});

it('able to get user profile', async () => {
  const res = await client.query({
    query: ME
  });

  expect(res).toMatchSnapshot();
});

it('able to login successfully', async () => {
  const res = await client.query({
    query: LOGIN,
    variables: {
      input: {
        email: user.email,
        password: 'testpassword'
      }
    }
  });

  expect(res).toMatchSnapshot();
});

it('able to signup successfully', async () => {
  const res = await client.query({
    query: SIGNUP,
    variables: {
      input: {
        name: 'A new Test User',
        email: 'new+test+user@test.com',
        password: 'testpassword'
      }
    }
  });

  expect(res).toMatchSnapshot();
});

describe('signup - validation errors', () => {
  it('returns correct error messages', async () => {
    const res = await client.query({
      query: SIGNUP,
      variables: {
        input: {
          name: '',
          email: 'dummy+user@testom',
          password: 'pass'
        }
      }
    });

    expect(res.errors[0].extensions.exception.errors).toEqual({
      name: 'Name must be at least 1 characters',
      email: 'Email must be a valid email',
      password: 'Password must be at least 6 characters'
    });
  });

  it('returns correct error message when email is taken during signup', async () => {
    const res = await client.query({
      query: SIGNUP,
      variables: {
        input: {
          name: 'Test User',
          email: 'test+user@test.com',
          password: 'testpassword'
        }
      }
    });

    expect(res.errors[0].message).toBe('Email is already taken');
  });
});

it('able to update user profile successfully', async () => {
  const res = await client.query({
    query: UPDATE_USER,
    variables: {
      input: {
        email: 'updated+user@test.com'
      }
    }
  });

  expect(res).toMatchSnapshot();
});

it('able to update user password successfully', async () => {
  const res = await client.query({
    query: UPDATE_USER,
    variables: {
      input: {
        password: 'newpassword'
      }
    }
  });

  expect(res).toMatchSnapshot();
});

describe('Update user validation errors', () => {
  it('returns correct error messages', async () => {
    const res = await client.query({
      query: UPDATE_USER,
      variables: {
        input: {
          name: '',
          email: 'test+user@.com',
          password: ''
        }
      }
    });

    expect(res.errors[0].extensions.exception.errors).toEqual({
      name: 'Name must be at least 1 characters',
      email: 'Email must be a valid email',
      password: 'Password must be at least 6 characters'
    });
  });
});

it('not able to request forgot password if user doesnt exist', async () => {
  const res = await client.query({
    query: FORGOT_PASSWORD,
    variables: {
      input: {
        email: 'weird+user@email.com'
      }
    }
  });

  expect(sgMail.send).not.toHaveBeenCalled();

  // Sends this message back to the user irrespective of success or not
  expect(res.data.ForgotPassword.message).toBe(
    'A link to reset your password will be sent to your registered email.'
  );
});

it('able to request forgot password successfully', async () => {
  const res = await client.query({
    query: FORGOT_PASSWORD,
    variables: {
      input: {
        email: user.email
      }
    }
  });

  expect(sgMail.send).toHaveBeenCalled();
  expect(res.data.ForgotPassword.message).toBe(
    'A link to reset your password will be sent to your registered email.'
  );
});

it('able to reset password with correct token', async () => {
  const res = await client.query({
    query: RESET_PASSWORD,
    variables: {
      input: {
        password: 'newpassword',
        token: 'RESET-PASSWORD-TOKEN'
      }
    }
  });

  expect(res.data.ResetPassword.message).toBe('Password updated successfully.');
});

it('not able to reset password with wrong token', async () => {
  const res = await client.query({
    query: RESET_PASSWORD,
    variables: {
      input: {
        password: 'newpassword',
        token: 'RESET-PASSWORD-TOKEN-WRONG'
      }
    }
  });

  expect(res).toMatchSnapshot();
});

it('able to delete user successfully', async () => {
  const existingUsers = await prisma.users();
  expect(existingUsers.length).toBe(1);

  await client.query({
    query: DELETE_USER
  });

  const users = await prisma.users();
  expect(users.length).toBe(0);
});
