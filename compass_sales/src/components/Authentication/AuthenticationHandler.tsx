import React, { useEffect } from 'react';
import { Alert, StyleSheet, View } from 'react-native';
import AuthenticationForm from './AuthenticationForm';
import RedButton from '../ui/RedButton';
import { Title } from '../ui/Title';
import { useNavigation } from '@react-navigation/native';

interface AuthenticationHandlerProps {
  isLogging?: boolean;
  forgotPass?: boolean;
  Authenticate: (credentials: {
    name: string;
    email: string;
    password: string;
  }) => void;
}

function AuthenticationHandler({
  isLogging,
  Authenticate,
  forgotPass,
}: AuthenticationHandlerProps) {
  const navigation = useNavigation();
  const [accountIsValid, setAccountIsValid] = React.useState(false);

  const recieveValidation = (validation: boolean) => {
    setAccountIsValid(validation);
  };

  useEffect(() => {
    if (forgotPass || isLogging) {
      setAccountIsValid(true);
    } else {
      setAccountIsValid(false);
    }
  }, [forgotPass, isLogging]);

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
    let { name, email, password } = credentials;
    if (accountIsValid) {
      Authenticate({ name, email, password });
    } else {
      Alert.alert('Validation Error', 'Please fill in all required fields.');
    }
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
        isValidated={recieveValidation}
        accountIsValid={accountIsValid}
      />
      <View style={styles.buttons}>
        {isLogging && (
          <RedButton
            onPress={switchAuthModeHandler}
          >
            Create a new user
          </RedButton>
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
