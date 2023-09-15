import React from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Image,
  TextStyle,
  ViewStyle,
} from 'react-native';

interface InputProps {
  label: string;
  keyboardType: any;
  onUpdateValue: (text: string) => void;
  value: string;
  showAfter: boolean;
  isPassword: boolean;
  isValid: boolean;
  message: string;
  labelStyle?: TextStyle;
  viewStyle?: ViewStyle;
}

const Input: React.FC<InputProps> = props => {
  return (
    <View style={[styles.container, props.viewStyle]}>
      <Text style={[styles.label, props.labelStyle]}>{props.label}</Text>
      <View style={styles.inverse}>
        <TextInput
          autoCapitalize="none"
          style={styles.input}
          keyboardType={props.keyboardType}
          onChangeText={props.onUpdateValue}
          value={props.value}
          secureTextEntry={props.isPassword}
        />
        {props.showAfter ? (
          !props.isValid ? (
            <Image
              source={require('../../assets/icons/outline-close-24px.png')}
            />
          ) : (
            <Image
              source={require('../../assets/icons/outline-check-24px.png')}
            />
          )
        ) : undefined}
      </View>
      {props.showAfter
        ? !props.isValid && (
            <Text style={[styles.label, props.labelStyle]}>
              {props.message}
            </Text>
          )
        : undefined}
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
  label: {
    color: 'gray',
    marginBottom: 4,
    marginLeft: 20,
    marginTop: 10,
    fontSize: 12,
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
