import * as yup from 'yup';
import validate from './validate';

const schema = yup.object().shape({
  name: yup
    .string()
    .min(1)
    .max(15),
  email: yup
    .string()
    .email()
    .min(1),
  password: yup.string().min(6)
});

export const validateUser = input => validate({ input, schema });

export default {
  validateUser
};
