import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import gql from 'graphql-tag';
import { useQuery, useMutation } from 'react-apollo-hooks';
import Link from 'next/link';
import { Image, Transformation } from 'cloudinary-react';
import { withRouter } from 'next/router';
import Alert from '../../components/alert-messages';
import Layout from '../../layouts/logged-in';
import { useUpload } from '../../lib/use-upload';

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

const FormEdit = ({
  router: {
    query: { id }
  }
}) => {
  const {
    data: { form = {} },
    loading
  } = useQuery(FORM, { variables: { id } });
  const [name, setName] = useState('');
  const [messages, setMessages] = useState(null);
  const update = useMutation(UPDATE_FORM);
  const { openWidget } = useUpload(async publicId => {
    try {
      await update({
        variables: {
          input: {
            id,
            name,
            logos: [publicId]
          }
        }
      });
    } catch (error) {
      setMessages({ warning: error.graphQLErrors[0].extensions.exception.errors });
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
                await update({
                  variables: {
                    input: {
                      id,
                      name
                    }
                  }
                });
              } catch (error) {
                setMessages({ warning: error.graphQLErrors[0].extensions.exception.errors });
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
                    <div key={assetId}>
                      <Image width="400" className="mr-2 mb-2" publicId={assetId}>
                        <Transformation width="800" crop="scale" />
                      </Image>
                    </div>
                  ))}
              </div>
            </div>
            <button type="submit" className="mt-3 btn btn-primary">
              Update form
            </button>
          </form>
          <Alert messages={messages} />
        </div>
      </div>
    </Layout>
  );
};

export default withRouter(FormEdit);

FormEdit.propTypes = {
  router: PropTypes.objectOf(PropTypes.any).isRequired
};
