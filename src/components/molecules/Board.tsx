import React, {useEffect} from 'react';
import {FlatList, StyleSheet, Text} from 'react-native';
import Square from '../atoms/Square';
import {BOARD_TILES} from '../../utils/constants';
import Button from '../atoms/Button';
import {useDispatch, useSelector} from 'react-redux';
import {
  setCpuMoves,
  setGameStart,
  setPlayerMoves,
  setWinner,
} from '../../store/game-data-slice/gameDataSlice';
import {RootState} from '../../store/store';
import {evaluate, findBestMove} from '../../utils/gameLogic';
import {GAME_STATUS} from '../../store/game-data-slice/types';
import {HEADER_FONT} from '../../utils/typography';

const Board = () => {
  const {data} = useSelector((state: RootState) => state.gameData);
  const dispatch = useDispatch();
  const handleOnPress = () => {
    dispatch(setGameStart(true));
  };

  useEffect(() => {
    if (data.gameStart && data.isCpuTurn) {
      const nextMove = findBestMove(
        data.availableMoves,
        data.playerMoves,
        data.cpuMoves,
      );
      dispatch(setCpuMoves([...data.cpuMoves, nextMove]));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data.isCpuTurn, dispatch]);

  useEffect(() => {
    const playerScore = evaluate(data.playerMoves, data.cpuMoves);
    if (playerScore === -10) {
      dispatch(setWinner(GAME_STATUS.PLAYER_WINS));
    } else if (playerScore === 10) {
      dispatch(setWinner(GAME_STATUS.CPU_WINS));
    } else if (data.availableMoves.length === 0) {
      dispatch(setWinner(GAME_STATUS.DRAW));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data.playerMoves, data.cpuMoves, data.availableMoves]);

  const handlePlayerMove = (value: number) => {
    if (
      data.gameStart &&
      !data.playerMoves.includes(value) &&
      !data.cpuMoves.includes(value) &&
      data.availableMoves.includes(value) &&
      !data.isCpuTurn
    ) {
      dispatch(setPlayerMoves([...data.playerMoves, value]));
    }
  };

  return (
    <>
      <FlatList
        data={BOARD_TILES}
        renderItem={({item}) => (
          <Square value={item} handlePlayerMove={handlePlayerMove} />
        )}
        numColumns={3}
        style={styles.container}
        contentContainerStyle={styles.flatList}
        ListFooterComponentStyle={styles.buttonContainer}
      />

      {data.winner && <Text style={HEADER_FONT}>{data.winner}</Text>}

      {!data.gameStart && <Button handleOnPress={handleOnPress} />}
    </>
  );
};

export default Board;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    padding: 32,
    flexDirection: 'row',
  },
  flatList: {
    flex: 1,
  },
  buttonContainer: {
    marginTop: 32,
    alignSelf: 'center',
    justifyContent: 'center',
  },
});
