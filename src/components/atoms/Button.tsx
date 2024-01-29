import React from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import {BUTTON_FONT} from '../../utils/typography';

interface ButtonProps {
  handleOnPress: () => void;
}

const Button = ({handleOnPress}: ButtonProps) => {
  return (
    <TouchableOpacity style={styles.container} onPress={() => handleOnPress()}>
      <Text style={styles.text}>START GAME</Text>
    </TouchableOpacity>
  );
};

export default Button;

const styles = StyleSheet.create({
  container: {
    height: 60,
    width: 200,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0ba6ff',
    borderRadius: 8,
  },
  text: {
    color: '#fff',
    fontWeight: 'bold',
    ...BUTTON_FONT,
  },
});
