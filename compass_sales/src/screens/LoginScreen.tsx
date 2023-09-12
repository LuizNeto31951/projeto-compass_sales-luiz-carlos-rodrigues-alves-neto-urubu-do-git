import React from 'react';
import AuthenticationHandler from '../components/authentication/AuthenticationHandler';
import {View, Alert} from 'react-native';
import LoadingOverlay from '../components/ui/LoadingOverlay';
import {login} from '../components/util/firebase';

function LoginScreen(): JSX.Element {
  interface loginProps {
    email: string;
    password: string;
  }

  const [loading, setLoading] = React.useState(false);

  async function loginHandler({email, password}: loginProps) {
    setLoading(true);
    try {
      await login(email, password);
    } catch (error) {
      Alert.alert(
        'Failed to login',
        'Check your credentials or try again later',
      );
    }

    setLoading(false);
  }

  if (loading) {
    return <LoadingOverlay message="Loading..." />;
  }

  return (
    <View>
      <AuthenticationHandler isLogging Authenticate={loginHandler} />
    </View>
  );
}

export default LoginScreen;
