import React from 'react';
import {View} from 'react-native';
import AuthenticationHandler from '../components/Authentication/AuthenticationHandler';

function ForgotPassword(): JSX.Element {
  return (
    <View>
      <AuthenticationHandler forgotPass />
    </View>
  );
}

export default ForgotPassword;