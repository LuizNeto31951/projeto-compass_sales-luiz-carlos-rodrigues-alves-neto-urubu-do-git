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
  isPassword: boolean;
  isValid: boolean;
  message: string;
  labelStyle?: TextStyle;
  viewStyle?: ViewStyle;
}

const Input: React.FC<InputProps> = props => {
  const [hasInput, setHasInput] = React.useState(false);

  const handleInputChange = (text: string) => {
    if (!hasInput) {
      setHasInput(true);
    }
    props.onUpdateValue(text);
  };

  return (
    <View>
      <View
        style={[
          styles.container,
          hasInput && !props.isValid ? props.viewStyle : undefined,
        ]}>
        <Text style={[styles.label, hasInput && !props.isValid ? props.labelStyle : undefined]}>{props.label}</Text>
        <View style={styles.inverse}>
          <TextInput
            autoCapitalize="none"
            style={styles.input}
            keyboardType={props.keyboardType}
            onChangeText={handleInputChange}
            value={props.value}
            secureTextEntry={props.isPassword}
          />
          {hasInput?(!props.isValid ? (
            <Image
              source={require('../../assets/icons/outline-close-24px.png')}
            />
          ) : (
            <Image
              source={require('../../assets/icons/outline-check-24px.png')}
            />
          )):undefined}
        </View>
      </View>
      {hasInput && !props.isValid && (
        <Text style={[styles.label, props.labelStyle, styles.errorLabel]}>
          {props.message}
        </Text>
      )}
    </View>
  );
};

export default Input;

const styles = StyleSheet.create({
  container: {
    marginVertical: 8,
    borderRadius: 5,
    elevation: 1,
    shadowColor: '#c0c0c0',
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
  errorLabel: {
    marginTop: 0,
  },
});
