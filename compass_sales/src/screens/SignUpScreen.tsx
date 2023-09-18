import React from 'react';
import AuthenticationHandler from '../components/authentication/AuthenticationHandler';
import {View, Alert, StyleSheet} from 'react-native';
import {signUp} from '../components/util/Firebase';
import LoadingOverlay from '../components/ui/LoadingOverlay';
import {AuthContext} from '../context/authContext';
import SocialButtons from '../components/Socials/SocialButtons';
import {useNavigation} from '@react-navigation/native';
import LoginScreen from './LoginScreen';

function SignUpScreen(): JSX.Element {
  interface signUpProps {
    name: string;
    email: string;
    password: string;
  }

  const [loading, setLoading] = React.useState(false);
  const navigation = useNavigation();

  async function signUpHandler({name, email, password}: signUpProps) {
    setLoading(true);
    try {
      const data = await signUp({name, email, password});
      navigation.navigate('LoginScreen' as never);
    } catch (error) {
      Alert.alert('SignUp failed', 'Please try again later!');
    }

    setLoading(false);
  }

  if (loading) {
    return <LoadingOverlay message="Loading..." />;
  }

  return (
    <View style={styles.container}>
      <AuthenticationHandler Authenticate={signUpHandler} />
      <SocialButtons />
    </View>
  );
}

export default SignUpScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
});
