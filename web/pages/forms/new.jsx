import React, { useState } from 'react';
import gql from 'graphql-tag';
import { useMutation } from 'react-apollo-hooks';
import Router from 'next/router';
import Link from 'next/link';
import { FORMS } from '../forms';
import { useErrorMessages } from '../../lib/use-error-messages';
import Alert from '../../components/alert-messages';
import Layout from '../../layouts/logged-in';

export const CREATE_FORM = gql`
  mutation($input: CreateFormInput!) {
    createForm(input: $input) {
      id
      name
    }
  }
`;

const NewForm = () => {
  const [name, setName] = useState('');
  const [errorMessages, setErrorMessages] = useErrorMessages(null);
  const create = useMutation(CREATE_FORM);

  return (
    <Layout>
      <div className="row">
        <div className="col-md-8">
          <div className="mb-3">
            <Link href="/forms">
              <a href="/forms">Back to all forms</a>
            </Link>
          </div>
          <h2 className="mb-3">Add a new form</h2>
          <Alert messages={errorMessages} />
          <p className="text-muted">What should we call this form?</p>
          <form
            onSubmit={async e => {
              e.preventDefault();
              try {
                await create({
                  variables: {
                    input: {
                      name
                    }
                  },
                  refetchQueries: [{ query: FORMS }]
                });
                Router.push('/forms');
              } catch (error) {
                setErrorMessages(error);
              }
            }}
          >
            <input
              value={name}
              onChange={e => setName(e.target.value)}
              type="text"
              className="form-control mb-3"
            />
            <button type="submit" className="mt-3 btn btn-primary">
              Create form
            </button>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default NewForm;
