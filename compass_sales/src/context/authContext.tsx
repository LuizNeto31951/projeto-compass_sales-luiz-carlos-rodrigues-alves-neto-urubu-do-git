import React from 'react';
import { MMKVLoader, useMMKVStorage } from 'react-native-mmkv-storage';

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

const storage = new MMKVLoader().initialize();

function AuthContextProvider({children}: AuthContextProviderProps) {
  const [token, setToken] = useMMKVStorage('token', storage,'');
  const [id, setId] = useMMKVStorage('id',storage,'');

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
