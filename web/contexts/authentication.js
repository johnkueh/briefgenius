import React, { useReducer } from 'react';

const initialState = {
  isLoggedIn: false,
  jwt: null,
  user: null
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'auth.SET_JWT':
      return {
        ...state,
        jwt: action.jwt
      };
    case 'auth.SET_USER':
      return {
        ...state,
        user: action.user
      };
    case 'auth.SET_IS_LOGGED_IN':
      return {
        ...state,
        isLoggedIn: action.isLoggedIn
      };
    default:
      throw new Error();
  }
};

export const AuthContext = React.createContext(initialState);

export default ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <AuthContext.Provider
      value={{
        ...state,
        setUser: user => {
          dispatch({ type: 'auth.SET_USER', user });
        },
        setJwt: jwt => {
          dispatch({ type: 'auth.SET_JWT', jwt });
        },
        setIsLoggedIn: isLoggedIn => {
          dispatch({ type: 'auth.SET_IS_LOGGED_IN', isLoggedIn });
        }
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
