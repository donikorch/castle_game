/* eslint-disable @typescript-eslint/no-unsafe-assignment */
// импорт устаревшего метода legacy_createStore + переименование
import { useDispatch, useSelector, type TypedUseSelectorHook } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import authSlice from '../pages/LogReg/authSlice';
import usersSlice from '../pages/Leadersboard/usersSlice';
import lobbySlice from '../pages/Lobby/lobbySlice';
import profileSlice from '../pages/Profile/profileSlice';
import gameSlice from '../pages/Game/gameSlice';

// Слайсы - это отдельные модули нашего приложения. У каждого слайса - свой редьюсер.
// import tasksSlice from './features/tasks/tasksSlice';
// import authSlice from './features/auth/authSlice';

const store = configureStore({
  // теперь функция combineReducers не нужна
  reducer: {
    profile: profileSlice,
    auth: authSlice,
    users: usersSlice,
    lobby: lobbySlice,
    game: gameSlice,
  },
});

// для правильной типизации будем использовать useAppDispatch вместо
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export default store;

// Типизация и экспорт хуков для работы с store
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
