import React from 'react';
import {Alert, StyleSheet, View} from 'react-native';

import AuthenticationForm from './AuthenticationForm';
import RedButton from '../ui/RedButton';
import {Title} from '../ui/Title';
import {useNavigation} from '@react-navigation/native';

interface AuthenticationHandlerProps {
  isLogging?: boolean;
  forgotPass?: boolean;
  Authenticate: (credentials: {
    name: string;
    email: string;
    password: string;
  }) => void;
}

interface isValid {
  name: boolean;
  email: boolean;
  password: boolean;
}

function AuthenticationHandler({
  isLogging,
  Authenticate,
  forgotPass,
}: AuthenticationHandlerProps) {
  const [isValid, setIsValid] = React.useState<isValid>({
    name: false,
    email: false,
    password: false,
  });

  const navigation = useNavigation();

  const switchAuthModeHandler = () => {
    if (isLogging) {
      navigation.navigate('SignUpScreen' as never);
    } else {
      navigation.navigate('LoginScreen' as never);
    }
  };

  const submitHandler = (credentials: {
    name: string;
    email: string;
    password: string;
  }) => {
    let {name, email, password} = credentials;

    name = name.trim();
    email = email.trim();
    password = password.trim();

    let nameIsValid = false;
    if (!isLogging) {
      nameIsValid = name.length > 0;
    } else {
      nameIsValid = true;
    }
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const emailIsValid = emailPattern.test(email);
    const passwordIsValid = password.length > 6;

    if(forgotPass){
      setIsValid({
        name: true,
        email: !emailIsValid,
        password: true,
      });
      if(isValid){
        Authenticate({name, email, password});
      }
      return;
    }

    if (!nameIsValid || !emailIsValid || !passwordIsValid) {
      Alert.alert('Invalid input', 'Try again.');
      setIsValid({
        name: !nameIsValid,
        email: !emailIsValid,
        password: !passwordIsValid,
      });
      return;
    }
    Authenticate({name, email, password});
  };

  return (
    <View>
      <Title>
        {forgotPass ? 'Forgot Password' : isLogging ? 'Login' : 'Sign in'}
      </Title>
      <AuthenticationForm
        isLogging={isLogging ? true : false}
        forgotPass={forgotPass ? true : false}
        onSubmit={submitHandler}
        inputInvalid={isValid}
      />
      <View style={styles.buttons}>
        {isLogging && (
        <RedButton onPress={switchAuthModeHandler}>Create a new user</RedButton>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  buttons: {
    marginTop: 8,
    marginHorizontal: 16,
  },
});

export default AuthenticationHandler;
