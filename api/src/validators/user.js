import * as yup from 'yup';

const schema = {
  login: yup.object().shape({
    email: yup
      .string()
      .email()
      .min(1),
    password: yup.string().min(6)
  }),
  signup: yup.object().shape({
    name: yup
      .string()
      .min(1)
      .max(15),
    email: yup
      .string()
      .email()
      .min(1),
    password: yup.string().min(6)
  }),
  updateUser: yup.object().shape({
    name: yup
      .string()
      .min(1)
      .max(15),
    email: yup
      .string()
      .email()
      .min(1),
    password: yup.string().min(6)
  }),
  forgotPassword: yup.object().shape({
    email: yup
      .string()
      .email()
      .min(1)
  }),
  resetPassword: yup.object().shape({
    token: yup.string().required('Password reset token is missing.'),
    password: yup
      .string()
      .required()
      .min(6)
  })
};

export default schema;
