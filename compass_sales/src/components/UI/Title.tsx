import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

interface TitleProps {
  children: React.ReactNode;
}

export const Title: React.FC<TitleProps> = props => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{props.children}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginLeft: 14,
    marginBottom: 62,
    marginTop: 26,
  },
  title: {
    fontSize: 34,
    color: 'black',
  },
});
