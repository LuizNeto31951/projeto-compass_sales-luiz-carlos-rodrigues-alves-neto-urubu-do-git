import React from 'react';
import AuthenticationHandler from '../components/Authentication/AuthenticationHandler';
import {View} from 'react-native';

function LoginScreen(): JSX.Element {
  return (
    <View>
      <AuthenticationHandler isLogging />
    </View>
  );
}

export default LoginScreen;
