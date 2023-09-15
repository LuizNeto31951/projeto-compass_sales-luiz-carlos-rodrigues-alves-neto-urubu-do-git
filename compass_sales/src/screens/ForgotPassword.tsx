import React from 'react';
import {View, Alert} from 'react-native';
import AuthenticationHandler from '../components/authentication/AuthenticationHandler';
import { resetPassword } from '../components/util/firebase';

function ForgotPassword(): JSX.Element {
  interface forgotProps {
    email: string;
  }
  function forgotHandler({email}: forgotProps) {
    try {
      resetPassword(email)
    } catch (error) {
      Alert.alert("Failed to send email", "Check credentials!")
    }
  }

  return (
    <View>
      <AuthenticationHandler forgotPass Authenticate={forgotHandler} />
    </View>
  );
}

export default ForgotPassword;
