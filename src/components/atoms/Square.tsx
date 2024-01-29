import React from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import {GAME_FONT} from '../../utils/typography';
import {useSelector} from 'react-redux';
import {RootState} from '../../store/store';

interface SquareProps {
  value: number;
  handlePlayerMove: (value: number) => void;
}

const Square = ({value, handlePlayerMove}: SquareProps) => {
  const {data} = useSelector((state: RootState) => state.gameData);

  const renderPlayersMoves = () => {
    if (data.playerMoves.includes(value)) {
      return 'X';
    }
    if (data.cpuMoves.includes(value)) {
      return 'O';
    }
  };

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => handlePlayerMove(value)}>
      <Text style={styles.text}>{renderPlayersMoves()}</Text>
    </TouchableOpacity>
  );
};

export default Square;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    borderColor: '#000',
    borderWidth: 1,
    width: 100,
    height: 110,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    ...GAME_FONT,
    fontWeight: 'bold',
  },
});
