import React, { useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import './App.css';
import NavBar from '../components/NavBar';
import GamePage from '../pages/Game/GamePage';
import MainPage from '../pages/Main/MainPage';
import LeadersboardPage from '../pages/Leadersboard/LeadersboardPage';
import LobbyPage from '../pages/Lobby/LobbyPage';
import LogPage from '../pages/LogReg/LogPage';
import RegPage from '../pages/LogReg/RegPage';
import ProfilePage from '../pages/Profile/ProfilePage';
import { useAppDispatch } from './store';
import * as thunk from '../pages/LogReg/authSlice';
import Page404 from '../pages/404/Page404';

function App(): JSX.Element {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(thunk.checkUser()).catch(console.log);
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<NavBar />}>
          <Route index element={<MainPage />} />
          <Route path="/level/:difficultId" element={<GamePage />} />
          <Route path="/leaderboard" element={<LeadersboardPage />} />
          <Route path="/lobby" element={<LobbyPage />} />
          <Route path="/sign-in" element={<LogPage />} />
          <Route path="/sign-up" element={<RegPage />} />
          <Route path="/profile/:username" element={<ProfilePage />} />
          <Route path="*" element={<Page404 />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
