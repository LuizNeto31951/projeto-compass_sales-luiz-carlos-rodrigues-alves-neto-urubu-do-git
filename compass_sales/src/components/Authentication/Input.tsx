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
    if (!hasInput && text !== '') {
      setHasInput(true);
    } else if (hasInput && text === '') {
      setHasInput(false);
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
        <Text
          style={[
            styles.label,
            {color: hasInput || props.value ? 'gray' : 'transparent'},
            hasInput && !props.isValid ? props.labelStyle : undefined,
          ]}>
          {hasInput || props.value ? props.label : ''}
        </Text>
        <View style={styles.inputContainer}>
          <TextInput
            autoCapitalize="none"
            style={styles.input}
            keyboardType={props.keyboardType}
            onChangeText={handleInputChange}
            value={props.value}
            secureTextEntry={props.isPassword}
            placeholder={props.label} // Use o mesmo nome como placeholder
            placeholderTextColor="gray" // Cor do placeholder
          />
          {hasInput ? (
            !props.isValid ? (
              <Image
                source={require('../../assets/icons/outline-close-24px.png')}
              />
            ) : (
              <Image
                source={require('../../assets/icons/outline-check-24px.png')}
              />
            )
          ) : null}
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
    marginTop: 8,
    borderRadius: 5,
    backgroundColor: 'white',
    shadowColor: 'black',
    elevation: 2,
  },
  label: {
    fontSize: 12,
    marginLeft: 5,
    paddingTop: 10,
    paddingLeft: 10,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginRight: 10,
  },
  input: {
    flex: 1,
    color: 'black',
    fontSize: 16,
    fontFamily: 'RobotoFlex-Regular',
    marginLeft: 10,
  },
  errorLabel: {
    color: 'red',
    marginLeft: 0,
    paddingTop: 2,
    paddingBottom: 10,
  },
});
