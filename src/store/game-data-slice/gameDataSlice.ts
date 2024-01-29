import {createSlice} from '@reduxjs/toolkit';
import {BOARD_TILES} from '../../utils/constants';

interface GameDataState {
  data: {
    gameStart: boolean;
    availableMoves: number[];
    cpuMoves: number[];
    playerMoves: number[];
    isCpuTurn: boolean;
    winner: string;
  };
}

const initialState: GameDataState = {
  data: {
    gameStart: false,
    availableMoves: BOARD_TILES,
    cpuMoves: [],
    playerMoves: [],
    isCpuTurn: false,
    winner: '',
  },
};

export const gameData = createSlice({
  name: 'gameData',
  initialState,
  reducers: {
    setGameStart(state, action) {
      state.data = initialState.data;
      state.data.gameStart = action.payload;
      return state;
    },
    setAvailableMoves(state, action) {
      state.data.availableMoves = [
        ...state.data.availableMoves,
        ...action.payload,
      ];
      return state;
    },
    setCpuMoves(state, action) {
      state.data.cpuMoves = action.payload;
      state.data.availableMoves = state.data.availableMoves.filter(
        (item: number) => item !== action.payload[0],
      );
      state.data.isCpuTurn = false;
      return state;
    },
    setPlayerMoves(state, action) {
      state.data.playerMoves = action.payload;
      state.data.availableMoves = state.data.availableMoves.filter(
        (item: number) => item !== action.payload[0],
      );
      state.data.isCpuTurn = true;
      return state;
    },
    setIsCpuTurn(state, action) {
      state.data.isCpuTurn = action.payload;
      return state;
    },
    setWinner(state, action) {
      state.data.winner = action.payload;
      state.data.gameStart = false;
      return state;
    },
  },
});

export const {
  setGameStart,
  setAvailableMoves,
  setCpuMoves,
  setPlayerMoves,
  setWinner,
} = gameData.actions;

export default gameData.reducer;
