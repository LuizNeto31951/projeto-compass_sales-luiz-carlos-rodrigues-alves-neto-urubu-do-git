import React from 'react';
import { TouchableOpacity, StyleSheet, Text, View } from 'react-native';

import { Colors } from '../../constants/styles';

interface RedButtonProps {
  onPress: () => void;
  children: React.ReactNode;
  disabled?: boolean; // Add a disabled prop
}

const RedButton: React.FC<RedButtonProps> = (props) => {
  return (
    <TouchableOpacity onPress={props.onPress} disabled={props.disabled}>
      <View style={[styles.button, props.disabled && styles.disabledButton]}>
        <Text style={styles.buttonText}>{props.children}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default RedButton;

const styles = StyleSheet.create({
  button: {
    borderRadius: 15,
    padding: 10,
    backgroundColor: Colors.buttonRed,
    elevation: 2,
    shadowColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 15,
    textTransform: 'uppercase',
    fontWeight: 'bold',
  },
  disabledButton: {
    backgroundColor: Colors.disabledButtonRed, // Define a style for disabled button
    opacity: 0.7, // Adjust opacity for disabled button
  },
});
