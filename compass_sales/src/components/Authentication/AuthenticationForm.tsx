import React from 'react';
import {StyleSheet, View} from 'react-native';

import RedButton from '../ui/RedButton';
import Input from './Input';
import TextButton from '../ui/TextButton';
import {useNavigation} from '@react-navigation/native';

interface AuthenticationFormProps {
  isLogging: boolean;
  forgotPass?: boolean;
  onSubmit: (credentials: {
    name: string;
    email: string;
    password: string;
  }) => void;
  inputInvalid: {
    name: boolean;
    email: boolean;
    password: boolean;
  };
}

const AuthenticationForm: React.FC<AuthenticationFormProps> = ({
  isLogging,
  forgotPass,
  onSubmit,
  inputInvalid,
}) => {
  const [showImage, setShowImage] = React.useState(false);
  const [enteredName, setEnteredName] = React.useState<string>('');
  const [enteredEmail, setEnteredEmail] = React.useState<string>('');
  const [enteredPassword, setEnteredPassword] = React.useState<string>('');

  const {
    name: nameIsInvald,
    email: emailIsInvalid,
    password: passwordIsInvalid,
  } = inputInvalid;

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

  const submitHandler = () => {
    onSubmit({
      name: enteredName,
      email: enteredEmail,
      password: enteredPassword,
    });
    setShowImage(true);
  };

  const forgotHandler = () => {
    setShowImage(false);
    navigation.navigate('ForgotPassword' as never);
  };

  const backHandler = () => {
    setShowImage(false);
    navigation.goBack();
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
            isInvalid={nameIsInvald}
            showImage={showImage}
            isPassword={false}
          />
        )}
        <Input
          label="Email Address"
          onUpdateValue={(value: string) =>
            updateInputValueHandler('email', value)
          }
          value={enteredEmail}
          keyboardType="email-address"
          isInvalid={emailIsInvalid}
          showImage={showImage}
          isPassword={false}
        />
        {!forgotPass && (
          <Input
            label="Password"
            onUpdateValue={(value: string) =>
              updateInputValueHandler('password', value)
            }
            value={enteredPassword}
            keyboardType="default"
            isInvalid={passwordIsInvalid}
            showImage={showImage}
            isPassword={true}
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
            <RedButton onPress={submitHandler}>
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

export default AuthenticationForm;

const styles = StyleSheet.create({
  form: {
    marginHorizontal: 16,
  },
  buttons: {
    marginTop: 16,
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
});
