import bcrypt from 'bcrypt';
import _ from 'lodash';

const users = [
  {
    id: 1,
    name: 'Test User',
    email: 'test+user@email.com',
    createdAt: new Date(1988, 2, 2),
    updatedAt: new Date(1988, 2, 3),
    periodStart: new Date(1988, 10, 10),
    periodEnd: new Date(1988, 10, 11),
    password: bcrypt.hashSync('testpassword', 10),
    resetPasswordToken: 'RESET-PASSWORD-TOKEN'
  },
  {
    id: 2,
    name: 'Test User',
    email: 'user+no+team@email.com',
    createdAt: new Date(1988, 2, 2),
    updatedAt: new Date(1988, 2, 3),
    periodStart: new Date(1988, 10, 10),
    periodEnd: new Date(1988, 10, 11),
    password: bcrypt.hashSync('testpassword', 10),
    resetPasswordToken: 'RESET-PASSWORD-TOKEN'
  }
];

export const prisma = {
  users: jest.fn(() => users),
  user: jest.fn(({ id, email, resetPasswordToken }) => {
    if (id) return _.find(users, { id });
    if (email) return _.find(users, { email });
    if (resetPasswordToken) return _.find(users, { resetPasswordToken });

    return null;
  }),
  createUser: jest.fn(fields => ({
    ..._.first(users),
    ...fields,
    password: bcrypt.hashSync(fields.password, 10)
  })),
  updateUser: jest.fn(fields => ({
    ..._.first(users),
    ...fields
  })),
  deleteUser: jest.fn()
};
export const test = {};
