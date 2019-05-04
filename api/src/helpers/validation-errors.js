import { UserInputError } from 'apollo-server';

const ValidationErrors = errors => new UserInputError('ValidationError', { errors });

export default ValidationErrors;
