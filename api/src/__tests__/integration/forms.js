import { graphqlRequest, prisma } from '../../lib/test-util';
import { SIGNUP } from '../../queries/user';

let user;
let jwt;

beforeEach(async () => {
  ({
    data: {
      Signup: { user, jwt }
    }
  } = await graphqlRequest({
    query: `
      mutation Signup($input: SignupInput!) {
        Signup(input: $input) {
          jwt
          user {
            id
            name
            email
          }
        }
      }
      `,
    variables: {
      input: {
        name: 'Test User',
        email: 'test@user.com',
        password: 'testpassword'
      }
    }
  }));
});

afterEach(async () => {
  await prisma.deleteManyUsers();
});

it('able to get all forms', async () => {
  await prisma.createForm({
    name: 'Form 1',
    user: {
      connect: { id: user.id }
    }
  });

  await prisma.createForm({
    name: 'Form 2',
    user: {
      connect: { id: user.id }
    }
  });

  await prisma.createForm({
    name: 'Form 3',
    user: {
      connect: { id: user.id }
    }
  });

  const res = await graphqlRequest({
    headers: {
      Authorization: `Bearer ${jwt}`
    },
    query: `
      query {
        forms {
          name
          logos {
            assetId
          }
        }
      }
  `
  });

  expect(res.data.forms).toEqual([
    { logos: [], name: 'Form 1' },
    { logos: [], name: 'Form 2' },
    { logos: [], name: 'Form 3' }
  ]);
});

it('able to get a single form', async () => {
  const form = await prisma.createForm({
    name: 'Form 1',
    user: {
      connect: { id: user.id }
    }
  });

  await prisma.updateForm({
    where: { id: form.id },
    data: {
      logos: {
        create: [{ assetId: 'public-id-1' }, { assetId: 'public-id-2' }, { assetId: 'public-id-3' }]
      }
    }
  });

  const res = await graphqlRequest({
    headers: {
      Authorization: `Bearer ${jwt}`
    },
    variables: {
      id: form.id
    },
    query: `
      query($id: String!) {
        form(id: $id) {
          name
          logos {
            assetId
          }
        }
      }
  `
  });

  expect(res.data.form).toEqual({
    logos: [{ assetId: 'public-id-1' }, { assetId: 'public-id-2' }, { assetId: 'public-id-3' }],
    name: 'Form 1'
  });
});

it('able create a form', async () => {
  const res = await graphqlRequest({
    headers: {
      Authorization: `Bearer ${jwt}`
    },
    variables: {
      input: { name: 'A new form' }
    },
    query: `
      mutation($input: CreateFormInput!) {
        createForm(input: $input) {
          name
          logos {
            assetId
          }
        }
      }
  `
  });

  expect(res.data.createForm).toEqual({
    name: 'A new form',
    logos: []
  });
});
