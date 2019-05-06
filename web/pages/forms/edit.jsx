import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import gql from 'graphql-tag';
import Link from 'next/link';
import { Formik, Form, Field } from 'formik';
import { useQuery, useMutation } from 'react-apollo-hooks';
import { withRouter } from 'next/router';
import { FORMS } from '../forms';
import { parseError } from '../../lib/parse-error';
import { useUpload } from '../../lib/use-upload';
import Button from '../../components/button';
import Logo from '../../components/logo';
import Alert from '../../components/alert-messages';
import Layout from '../../layouts/logged-in';

const FormEdit = ({
  router: {
    push,
    query: { id }
  }
}) => {
  const [deleting, setDeleting] = useState(false);
  const [messages, setMessages] = useState(null);
  const {
    data: { form }
  } = useQuery(FORM, { variables: { id } });
  const updateForm = useMutation(UPDATE_FORM);
  const deleteForm = useMutation(DELETE_FORM);
  const deleteLogo = useMutation(DELETE_LOGO);
  const openWidget = useUpload();

  if (!form) return null;

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
          <Formik
            initialValues={{ id: form.id, name: form.name }}
            onSubmit={async (currentValues, { setSubmitting }) => {
              try {
                await updateForm({
                  variables: {
                    input: currentValues
                  }
                });
                setSubmitting(false);
              } catch (error) {
                setMessages(parseError(error));
              }
            }}
          >
            {({ isSubmitting }) => (
              <Form>
                <Field name="name" className="form-control mb-3" type="text" />
                <div>
                  <button
                    className="px-0 btn btn-link"
                    type="button"
                    onClick={() => {
                      openWidget({
                        onUpload: async publicId => {
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
                        }
                      });
                    }}
                  >
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
                  <Button
                    loading={isSubmitting}
                    loadingText="Updating..."
                    className="btn btn-primary"
                    type="submit"
                  >
                    Update form
                  </Button>
                  <Button
                    loading={deleting}
                    loadingText="Deleting..."
                    className="btn btn-link pl-3"
                    type="button"
                    onClick={async () => {
                      const { loading: deletingState } = await deleteForm({
                        variables: { id },
                        refetchQueries: [{ query: FORMS }]
                      });
                      setDeleting(deletingState);
                      push('/forms');
                    }}
                  >
                    Delete
                  </Button>
                </div>
              </Form>
            )}
          </Formik>
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
