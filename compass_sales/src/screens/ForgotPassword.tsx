import React from 'react';
import {View} from 'react-native';
import AuthenticationHandler from '../components/authentication/AuthenticationHandler';

function ForgotPassword(): JSX.Element {
  function forgotHandler() {}

  return (
    <View>
      <AuthenticationHandler forgotPass Authenticate={forgotHandler} />
    </View>
  );
}

export default ForgotPassword;
