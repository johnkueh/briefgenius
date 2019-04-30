export const ME = `
  query {
    Me {
      name
      email
    }
  }
`;

export const SIGNUP = `
mutation Signup($input: SignupInput!) {
  Signup(input: $input) {
    jwt
    user {
      name
      email
    }
  }
}
`;

export const LOGIN = `
mutation Login($input: LoginInput!) {
  Login(input: $input) {
    jwt
    user {
      name
      email
    }
  }
}
`;

export const UPDATE_USER = `
mutation UpdateUser($input: UpdateUserInput!) {
  UpdateUser(input: $input) {
    name
    email
  }
}
`;

export const FORGOT_PASSWORD = `
mutation ForgotPassword($input: ForgotPasswordInput!) {
  ForgotPassword(input: $input) {
    message
  }
}
`;

export const RESET_PASSWORD = `
mutation ResetPassword($input: ResetPasswordInput!) {
  ResetPassword(input: $input) {
    message
  }
}
`;

export const DELETE_USER = `
mutation DeleteUser {
  DeleteUser {
    id
  }
}
`;
