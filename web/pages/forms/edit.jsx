import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import gql from 'graphql-tag';
import { useQuery, useMutation } from 'react-apollo-hooks';
import Link from 'next/link';
import { withRouter } from 'next/router';
import { FORMS } from '../forms';
import { parseError } from '../../lib/parse-error';
import { useUpload } from '../../lib/use-upload';
import Logo from '../../components/logo';
import Alert from '../../components/alert-messages';
import Layout from '../../layouts/logged-in';

const FormEdit = ({
  router: {
    push,
    query: { id }
  }
}) => {
  const [name, setName] = useState('');
  const [deleting, setDeleting] = useState(false);
  const [messages, setMessages] = useState(null);
  const {
    data: { form = {} },
    loading
  } = useQuery(FORM, { variables: { id } });
  const updateForm = useMutation(UPDATE_FORM);
  const deleteForm = useMutation(DELETE_FORM);
  const deleteLogo = useMutation(DELETE_LOGO);
  const { openWidget } = useUpload(async publicId => {
    try {
      await updateForm({
        variables: {
          input: {
            id,
            logos: [publicId]
          }
        }
      });
    } catch (error) {
      setMessages(parseError(error));
    }
  });

  useEffect(() => {
    !loading && setName(form.name);
  }, [loading, form.name]);

  return (
    <Layout>
      <div className="row">
        <div className="col-md-12">
          <div className="mb-3">
            <Link href="/forms">
              <a href="/forms">Back to all forms</a>
            </Link>
          </div>
          <h2 className="mb-3">Edit form</h2>
          <form
            onSubmit={async e => {
              e.preventDefault();
              try {
                await updateForm({
                  variables: {
                    input: {
                      id,
                      name
                    }
                  }
                });
              } catch (error) {
                setMessages(parseError(error));
              }
            }}
          >
            <input
              value={name}
              onChange={e => setName(e.target.value)}
              type="text"
              className="form-control mb-3"
            />
            <div>
              <button className="px-0 btn btn-link" type="button" onClick={openWidget}>
                Upload logos
              </button>
              <div className="d-flex flex-wrap">
                {form.logos &&
                  form.logos.map(({ assetId }) => (
                    <Logo
                      width="300"
                      height="225"
                      key={assetId}
                      assetId={assetId}
                      onDelete={async () => {
                        await deleteLogo({
                          variables: { assetId },
                          refetchQueries: [
                            {
                              query: FORM,
                              variables: { id }
                            }
                          ]
                        });
                      }}
                    />
                  ))}
              </div>
            </div>
            <div className="mt-3">
              <button type="submit" className="btn btn-primary">
                Update form
              </button>
              <button
                disabled={deleting}
                onClick={async () => {
                  const { loading: deletingState } = await deleteForm({
                    variables: { id },
                    refetchQueries: [{ query: FORMS }]
                  });
                  setDeleting(deletingState);
                  push('/forms');
                }}
                type="button"
                className="ml-3 btn btn-link px-0"
              >
                Delete
              </button>
            </div>
          </form>
          <Alert messages={messages} />
        </div>
      </div>
    </Layout>
  );
};

export const FORM = gql`
  query($id: String!) {
    form(id: $id) {
      id
      name
      logos {
        assetId
      }
    }
  }
`;

export const UPDATE_FORM = gql`
  mutation($input: UpdateFormInput!) {
    updateForm(input: $input) {
      id
      name
      logos {
        assetId
      }
    }
  }
`;

export const DELETE_FORM = gql`
  mutation($id: String!) {
    deleteForm(id: $id) {
      id
      name
      logos {
        assetId
      }
    }
  }
`;

export const DELETE_LOGO = gql`
  mutation($assetId: String!) {
    deleteLogo(assetId: $assetId) {
      id
      assetId
    }
  }
`;

export default withRouter(FormEdit);

FormEdit.propTypes = {
  router: PropTypes.objectOf(PropTypes.any).isRequired
};
