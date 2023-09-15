import React from 'react';

export const AuthContext = React.createContext({
  valid: false,
  id: '',
  token: '',
  isLogged: false,
  authLogin: (token: string, id: string) => {},
  authLogout: () => {},
  isValid: () => {},
});

interface AuthContextProviderProps {
  children: React.ReactNode;
}

function AuthContextProvider({children}: AuthContextProviderProps) {
  const [token, setToken] = React.useState('');
  const [id, setId] = React.useState('');
  const [valid, setValid] = React.useState(false);

  function isValid(){
    setValid(valid);
  }

  function authLogin(token: string, id: string) {
    setToken(token);
    setId(id);
  }

  function authLogout() {
    setToken('');
    setId('');
  }

  const value = {
    valid: valid,
    id: id,
    token: token,
    isLogged: !!token,
    authLogin: authLogin,
    authLogout: authLogout,
    isValid: isValid
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export default AuthContextProvider;
