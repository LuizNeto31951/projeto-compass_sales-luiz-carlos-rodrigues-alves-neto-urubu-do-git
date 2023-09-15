import React from 'react';
import {TouchableOpacity, StyleSheet, Text, View} from 'react-native';

import {Colors} from '../../constants/styles';

interface IconButtonProps {
  onPress: () => void;
  children: React.ReactNode;
}

const IconButton: React.FC<IconButtonProps> = props => {
  return (
    <TouchableOpacity onPress={props.onPress}>
      <View style={styles.button}>
        <Text style={styles.buttonText}>{props.children}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default IconButton;

const styles = StyleSheet.create({
  button: {
    borderRadius: 15,
    padding: 10,
    backgroundColor: "white",
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
});
