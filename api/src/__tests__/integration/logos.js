import { graphqlRequest, prisma } from '../../lib/test-util';

let user;
let jwt;

beforeEach(async () => {
  ({
    data: {
      signup: { user, jwt }
    }
  } = await graphqlRequest({
    query: `
      mutation signup($input: SignupInput!) {
        signup(input: $input) {
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
  await prisma.deleteManyForms();
  await prisma.deleteManyLogoes();
});

it('able to delete own logos', async () => {
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

  await graphqlRequest({
    headers: {
      Authorization: `Bearer ${jwt}`
    },
    variables: {
      assetId: 'public-id-1'
    },
    query: `
      mutation($assetId: String!) {
        deleteLogo(assetId: $assetId) {
          id
          assetId
        }
      }
  `
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
    logos: [{ assetId: 'public-id-2' }, { assetId: 'public-id-3' }],
    name: 'Form 1'
  });
});
