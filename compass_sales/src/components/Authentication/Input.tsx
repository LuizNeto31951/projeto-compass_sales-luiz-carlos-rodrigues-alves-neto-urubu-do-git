import React from 'react';
import {View, Text, TextInput, StyleSheet, Image} from 'react-native';

import {Colors} from '../../constants/styles';

interface InputProps {
  label: string;
  keyboardType: any;
  onUpdateValue: (text: string) => void;
  value: string;
  isInvalid: boolean;
  showImage: boolean;
  isPassword: boolean;
}

const Input: React.FC<InputProps> = props => {
  return (
    <View
      style={[styles.container, props.isInvalid && styles.containerInvalid]}>
      <Text style={[styles.label, props.isInvalid && styles.labelInvalid]}>
        {props.label}
      </Text>
      <View style={styles.inverse}>
        <TextInput
          autoCapitalize="none"
          style={styles.input}
          keyboardType={props.keyboardType}
          onChangeText={props.onUpdateValue}
          value={props.value}
          secureTextEntry={props.isPassword}
        />
        {props.showImage &&
          (props.isInvalid ? (
            <Image
              source={require('../../assets/icons/outline-close-24px.png')}
            />
          ) : (
            <Image
              source={require('../../assets/icons/outline-check-24px.png')}
            />
          ))}
      </View>
    </View>
  );
};

export default Input;

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: 'gray',
    marginVertical: 8,
    borderRadius: 5,
  },
  containerInvalid: {
    borderWidth: 1,
    borderColor: Colors.errorInput,
  },
  label: {
    color: 'gray',
    marginBottom: 4,
    marginLeft: 20,
    marginTop: 10,
    fontSize: 12,
  },
  labelInvalid: {
    color: Colors.errorLabel,
  },
  input: {
    flex: 1,
    color: 'black',
    paddingVertical: 4,
    paddingHorizontal: 6,
    borderRadius: 4,
    fontSize: 16,
    marginLeft: 13,
  },
  inverse: {
    flexDirection: 'row',
    marginRight: 16,
  },
});
