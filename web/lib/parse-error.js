export const parseError = error => ({
  warning: error.graphQLErrors[0].extensions.exception.errors
});

export default {
  parseError
};
