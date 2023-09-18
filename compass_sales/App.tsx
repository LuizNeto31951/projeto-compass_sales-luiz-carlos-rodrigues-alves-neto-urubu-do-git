import 'react-native-gesture-handler';
import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import LoginScreen from './src/screens/LoginScreen';
import ForgotPassword from './src/screens/ForgotPassword';
import HomeScreen from './src/screens/HomeScreen';
import {NavigationContainer} from '@react-navigation/native';
import SignUpScreen from './src/screens/SignUpScreen';
import {StatusBar} from 'react-native';
import AuthContextProvider, {AuthContext} from './src/context/authContext';
import BackButton from './src/components/ui/BackButton';

const Stack = createStackNavigator();

function NotAuth(): JSX.Element {
  return (
    <Stack.Navigator screenOptions={{headerTitle: "",}}>
      <Stack.Screen name="LoginScreen" component={LoginScreen} />
      <Stack.Screen options={({ navigation }) => ({headerLeft: () => <BackButton onPress={() => navigation.goBack()} />})}name="ForgotPassword" component={ForgotPassword} />
      <Stack.Screen options={({ navigation }) => ({headerLeft: () => <BackButton onPress={() => navigation.goBack()} />})}name="SignUpScreen" component={SignUpScreen} />
    </Stack.Navigator>
  );
}

function Auth(): JSX.Element {
  return (
    <Stack.Navigator>
      <Stack.Screen name="HomeScreen" component={HomeScreen} />
    </Stack.Navigator>
  );
}

function Navigation(): JSX.Element {
  const ctx = React.useContext(AuthContext);

  return (
    <NavigationContainer>
      {!ctx.isLogged && <NotAuth />}
      {ctx.isLogged && <Auth />}
    </NavigationContainer>
  );
}

function App(): JSX.Element {
  return (
    <>
      <StatusBar backgroundColor={'white'} barStyle={'dark-content'} />
      <AuthContextProvider>
        <Navigation />
      </AuthContextProvider>
    </>
  );
}
export default App;
