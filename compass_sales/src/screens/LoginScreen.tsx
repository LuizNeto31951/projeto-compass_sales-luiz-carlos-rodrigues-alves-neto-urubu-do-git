import React from 'react';
import AuthenticationHandler from '../components/authentication/AuthenticationHandler';
import {View, Alert,StyleSheet} from 'react-native';
import LoadingOverlay from '../components/ui/LoadingOverlay';
import {login} from '../components/util/Firebase';
import {AuthContext} from '../context/authContext';
import SocialButtons from '../components/Socials/SocialButtons'

function LoginScreen(): JSX.Element {
  interface loginProps {
    email: string;
    password: string;
  }

  const [loading, setLoading] = React.useState(false);
  const ctx = React.useContext(AuthContext);

  async function loginHandler({email, password}: loginProps) {
    setLoading(true);
    try {
      const data = await login(email, password);
      ctx.authLogin(data.token, data.id);
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
    <View style={styles.container}>
      <AuthenticationHandler isLogging Authenticate={loginHandler} />
      <SocialButtons/>
    </View>
  );
}

export default LoginScreen;

const styles = StyleSheet.create({
  container:{
    flex: 1,
    backgroundColor: 'white'
  }
})