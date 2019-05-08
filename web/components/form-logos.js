import React from 'react';
import PropTypes from 'prop-types';
import gql from 'graphql-tag';
import { useMutation } from 'react-apollo-hooks';
import Logos from './logos';

const FormLogos = ({ id, logos }) => {
  const updateForm = useMutation(UPDATE_FORM);
  const deleteLogo = useMutation(DELETE_LOGO);
  return (
    <Logos
      logos={logos}
      onUpload={async publicId => {
        await updateForm({
          variables: {
            input: {
              id,
              logos: [publicId]
            }
          }
        });
      }}
      onDelete={async assetId => {
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

export const DELETE_LOGO = gql`
  mutation($assetId: String!) {
    deleteLogo(assetId: $assetId) {
      id
      assetId
    }
  }
`;

export default FormLogos;

FormLogos.propTypes = {
  id: PropTypes.string,
  logos: PropTypes.arrayOf(PropTypes.object)
};

FormLogos.defaultProps = {
  id: null,
  logos: []
};
