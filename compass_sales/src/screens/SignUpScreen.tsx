import React from 'react';
import AuthenticationHandler from '../components/Authentication/AuthenticationHandler';
import {View} from 'react-native';

function SignUpScreen(): JSX.Element {
  return (
    <View>
      <AuthenticationHandler />
    </View>
  );
}

export default SignUpScreen;
