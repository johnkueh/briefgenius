import _ from 'lodash';
import { UserInputError, SchemaDirectiveVisitor } from 'apollo-server';
import { defaultFieldResolver } from 'graphql';

export default class ValidateInputDirective extends SchemaDirectiveVisitor {
  visitFieldDefinition(field) {
    const { resolve = defaultFieldResolver } = field;
    field.resolve = async (...args) => {
      const [, { input }, { validationSchema, prisma, user }, { fieldName }] = args;
      const schema = validationSchema[fieldName];

      if (schema) {
        try {
          await schema.validate(input, { abortEarly: false });
        } catch (error) {
          const { name, inner } = error;
          const errors = {};
          inner.forEach(({ path, message }) => {
            errors[path] = _.capitalize(message);
          });
          throw new UserInputError(name, {
            errors
          });
        }
      }

      const result = await resolve.apply(this, args);
      return result;
    };
  }
}
