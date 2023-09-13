import React from 'react';
import AuthenticationHandler from '../components/authentication/AuthenticationHandler';
import {View, Alert} from 'react-native';
import {signUp} from '../components/util/firebase';
import LoadingOverlay from '../components/ui/LoadingOverlay';
import {AuthContext} from '../context/authContext';

function SignUpScreen(): JSX.Element {
  interface signUpProps {
    name: string;
    email: string;
    password: string;
  }

  const [loading, setLoading] = React.useState(false);
  const ctx = React.useContext(AuthContext);

  async function signUpHandler({name, email, password}: signUpProps) {
    setLoading(true);
    try {
      const data = await signUp({name, email, password});
      ctx.authLogin(data.token, data.id);
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
