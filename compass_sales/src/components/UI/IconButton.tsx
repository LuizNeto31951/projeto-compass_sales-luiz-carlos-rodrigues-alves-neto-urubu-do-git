import React from 'react';
import {
  TouchableOpacity,
  StyleSheet,
  Image,
  View,
} from 'react-native';

interface IconButtonProps {
  onPress: () => void;
  facebook?: boolean;
  google?: boolean;
}

const IconButton: React.FC<IconButtonProps> = props => {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={props.onPress}>
        <View style={styles.buttonContainer}>
          {props.facebook && (
            <Image source={require('../../assets/icons/Facebook.png')} />
          )}
          {props.google && (
            <Image source={require('../../assets/icons/Google.png')} />
          )}
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default IconButton;

const styles = StyleSheet.create({
  container: {
  },
  button: {
    backgroundColor: 'white',
    elevation: 2,
    shadowColor: 'black',
    borderRadius: 15,
    paddingHorizontal: 30,
    paddingVertical: 15,
    marginHorizontal: 10,
  },
  buttonContainer: {
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
