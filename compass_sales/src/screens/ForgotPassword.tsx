import React from 'react';
import {View, Alert} from 'react-native';
import AuthenticationHandler from '../components/authentication/AuthenticationHandler';
import { resetPassword } from '../components/util/Firebase';

function ForgotPassword(): JSX.Element {
  interface forgotProps {
    email: string;
  }
  function forgotHandler({email}: forgotProps) {
    console.log(email);
    try {
      resetPassword(email)
      Alert.alert("Email sent succesfully", "Check your email for changing your password!")
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
