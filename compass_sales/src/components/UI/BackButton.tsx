import React from 'react';
import {TouchableOpacity, StyleSheet, Image} from 'react-native';


interface IconButtonProps {
  onPress: () => void;
}

const BackButton: React.FC<IconButtonProps> = props => {
  return (
    <TouchableOpacity
    style={styles.button}
    onPress={props.onPress}  >
    <Image source={require(`../../assets/icons/goBack-Arrow.png`)}/>
  </TouchableOpacity>
  );
};

export default BackButton;

const styles = StyleSheet.create({
  button: {
    marginLeft: 16
  },
});
