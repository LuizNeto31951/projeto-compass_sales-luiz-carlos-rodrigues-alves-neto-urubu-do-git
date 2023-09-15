import React, {useEffect} from 'react';
import {StyleSheet, View} from 'react-native';
import RedButton from '../ui/RedButton';
import Input from './Input';
import TextButton from '../ui/TextButton';
import {useNavigation} from '@react-navigation/native';
import {AuthContext} from '../../context/authContext';
import {Colors} from '../../constants/styles';

interface AuthenticationFormProps {
  isLogging: boolean;
  forgotPass?: boolean;
  isValidated: (validate: boolean) => void;
  onSubmit: (credentials: {
    name: string;
    email: string;
    password: string;
  }) => void;
  accountIsValid: boolean;
}

const AuthenticationForm: React.FC<AuthenticationFormProps> = ({
  isLogging,
  forgotPass,
  isValidated,
  onSubmit,
  accountIsValid,
}) => {
  const [showAfter, setShowAfter] = React.useState(false);
  const [enteredName, setEnteredName] = React.useState<string>('');
  const [enteredEmail, setEnteredEmail] = React.useState<string>('');
  const [enteredPassword, setEnteredPassword] = React.useState<string>('');
  const [isValid, setIsValid] = React.useState({
    name: false,
    email: false,
    password: false,
  });

  const ctx = React.useContext(AuthContext);

  const navigation = useNavigation();

  const updateInputValueHandler = (inputType: string, enteredValue: string) => {
    switch (inputType) {
      case 'name':
        setEnteredName(enteredValue);
        break;
      case 'email':
        setEnteredEmail(enteredValue);
        break;
      case 'password':
        setEnteredPassword(enteredValue);
        break;
    }
  };

  useEffect(() => {
    const name = enteredName.trim();
    const email = enteredEmail.trim();
    const password = enteredPassword.trim();

    let nameIsValid = false;
    if (!isLogging) {
      nameIsValid = name.length > 0;
    } else {
      nameIsValid = true;
    }
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const emailIsValid = emailPattern.test(email);
    const passwordIsValid = password.length > 6;

    setIsValid({
      name: nameIsValid,
      email: emailIsValid,
      password: passwordIsValid,
    });

    if (forgotPass) {
      isValidated(true);
    } else {
      isValidated(nameIsValid && emailIsValid && passwordIsValid);
    }
  }, [
    enteredName,
    enteredEmail,
    enteredPassword,
    forgotPass,
    isLogging,
    isValidated,
  ]);

  const submitHandler = () => {
    onSubmit({
      name: enteredName,
      email: enteredEmail,
      password: enteredPassword,
    });
    setShowAfter(true);
  };

  const forgotHandler = () => {
    setShowAfter(false);
    navigation.navigate('ForgotPassword' as never);
  };

  const backHandler = () => {
    setShowAfter(false);
    navigation.navigate('LoginScreen' as never);
  };

  return (
    <View style={styles.form}>
      <View>
        {!isLogging && !forgotPass && (
          <Input
            label="Name"
            onUpdateValue={(value: string) =>
              updateInputValueHandler('name', value)
            }
            value={enteredName}
            keyboardType="default"
            showAfter={showAfter}
            isPassword={false}
            isValid={isValid.name}
            message="Name should not be empty"
            labelStyle={isValid.name ? undefined : styles.labelInvalid}
            viewStyle={isValid.name ? undefined : styles.containerInvalid}
          />
        )}
        <Input
          label="Email Address"
          onUpdateValue={(value: string) =>
            updateInputValueHandler('email', value)
          }
          value={enteredEmail}
          keyboardType="email-address"
          showAfter={showAfter}
          isPassword={false}
          isValid={isValid.email}
          message="Email must be valid. Example : example@example.com"
          labelStyle={isValid.email ? undefined : styles.labelInvalid}
          viewStyle={isValid.email ? undefined : styles.containerInvalid}
        />
        {!forgotPass && (
          <Input
            label="Password"
            onUpdateValue={(value: string) =>
              updateInputValueHandler('password', value)
            }
            value={enteredPassword}
            keyboardType="default"
            showAfter={showAfter}
            isPassword={true}
            isValid={isValid.password}
            message="Password must have at least 6 characters"
            labelStyle={isValid.password ? undefined : styles.labelInvalid}
            viewStyle={isValid.password ? undefined : styles.containerInvalid}
          />
        )}
        <View style={styles.buttons}>
          {!forgotPass ? (
            isLogging ? (
              <TextButton
                onPress={forgotHandler}
                textStyle={styles.text}
                viewStyle={styles.container}
                icon="round-arrow_right_alt-24px.png">
                Forgot your password?
              </TextButton>
            ) : (
              <TextButton
                onPress={backHandler}
                textStyle={styles.text}
                viewStyle={styles.container}
                icon="round-arrow_right_alt-24px.png">
                Already have an account?
              </TextButton>
            )
          ) : null}
          {!forgotPass ? (
            <RedButton
              onPress={submitHandler}
              disabled={!accountIsValid}
            >
              {isLogging ? 'Log In' : 'Sign Up'}
            </RedButton>
          ) : (
            <RedButton onPress={submitHandler}>Send</RedButton>
          )}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  form: {
    marginHorizontal: 16,
  },
  buttons: {
    marginTop: 2,
  },
  text: {
    fontSize: 15,
    color: 'black',
  },
  container: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
    marginBottom: 32,
  },
  labelInvalid: {
    color: Colors.errorLabel,
  },
  containerInvalid: {
    borderWidth: 1,
    borderColor: Colors.errorInput,
  },
});

export default AuthenticationForm;
