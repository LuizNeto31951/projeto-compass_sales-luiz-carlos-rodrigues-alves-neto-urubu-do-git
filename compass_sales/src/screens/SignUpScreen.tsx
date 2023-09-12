import React from 'react';
import AuthenticationHandler from '../components/authentication/AuthenticationHandler';
import {View, Alert} from 'react-native';
import {signUp} from '../components/util/firebase';
import LoadingOverlay from '../components/ui/LoadingOverlay';

function SignUpScreen(): JSX.Element {
  interface signUpProps {
    email: string;
    password: string;
  }

  const [loading, setLoading] = React.useState(false);

  async function signUpHandler({email, password}: signUpProps) {
    setLoading(true);
    try {
      await signUp(email, password);
    } catch (error) {
      Alert.alert('SignUp failed', 'Please try again later!');
    }

    setLoading(false);
  }

  if (loading) {
    return <LoadingOverlay message="Loading..." />;
  }

  return (
    <View>
      <AuthenticationHandler Authenticate={signUpHandler} />
    </View>
  );
}

export default SignUpScreen;
