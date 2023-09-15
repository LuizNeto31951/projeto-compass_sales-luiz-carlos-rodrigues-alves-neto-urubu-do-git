import React from 'react';

export const AuthContext = React.createContext({
  id: '',
  token: '',
  isLogged: false,
  authLogin: (token: string, id: string) => {},
  authLogout: () => {},
});

interface AuthContextProviderProps {
  children: React.ReactNode;
}

function AuthContextProvider({children}: AuthContextProviderProps) {
  const [token, setToken] = React.useState('');
  const [id, setId] = React.useState('');

  function authLogin(token: string, id: string) {
    setToken(token);
    setId(id);
  }

  function authLogout() {
    setToken('');
    setId('');
  }

  const value = {
    id: id,
    token: token,
    isLogged: !!token,
    authLogin: authLogin,
    authLogout: authLogout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export default AuthContextProvider;
