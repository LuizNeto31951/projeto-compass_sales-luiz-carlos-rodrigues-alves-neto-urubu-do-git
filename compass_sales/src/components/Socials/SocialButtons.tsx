import React, {useEffect, useState} from 'react';
import {Text, View, StyleSheet, Keyboard, Platform} from 'react-native';
import IconButton from '../ui/IconButton';

function SocialButtons() {
  const [keyboardHeight, setKeyboardHeight] = useState(0);

  function googleHandler() {}

  function facebookHandler() {}

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      event => {
        const keyboardHeight = -event.endCoordinates.height;
        setKeyboardHeight(keyboardHeight);
      },
    );

    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setKeyboardHeight(0);
      },
    );

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Or sign up with a social account</Text>
      <View style={[styles.buttons, {marginBottom: keyboardHeight}]}>
        <IconButton onPress={googleHandler} google />
        <IconButton onPress={facebookHandler} facebook />
      </View>
    </View>
  );
}

export default SocialButtons;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'white',
    alignItems: 'center',
    marginBottom: 30,
  },
  text: {
    color: 'black',
  },
  buttons: {
    flexDirection: 'row',
    marginTop: 10,
  },
});
