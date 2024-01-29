import {configureStore} from '@reduxjs/toolkit';
import gameDataReducer from './game-data-slice/gameDataSlice';

export const store = configureStore({
  reducer: {
    gameData: gameDataReducer,
  },
  middleware: (getDefaultMiddleware: any) =>
    getDefaultMiddleware({serializableCheck: false}),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
