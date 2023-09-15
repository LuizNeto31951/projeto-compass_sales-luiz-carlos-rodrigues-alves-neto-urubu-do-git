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

const Stack = createStackNavigator();

function NotAuth(): JSX.Element {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="LoginScreen" component={LoginScreen} />
      <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
      <Stack.Screen name="SignUpScreen" component={SignUpScreen} />
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
      <StatusBar barStyle={'light-content'} />
      <AuthContextProvider>
        <Navigation />
      </AuthContextProvider>
    </>
  );
}
export default App;
