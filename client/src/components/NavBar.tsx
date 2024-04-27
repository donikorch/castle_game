import React from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../app/store';
import type { User } from '../pages/LogReg/type';
import * as thunk from '../pages/LogReg/authSlice';
import './navbar.css';
import Footer from './Footer';

function NavBar(): JSX.Element {
  const user: User | undefined = useAppSelector((store) => store.auth.user);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleLogout = async (): Promise<void> => {
    dispatch(thunk.logOutUser()).catch(console.log);
    navigate('/');
  };

  const handleTheme = (): void => {
    let mode = ui('mode');

    if (mode === 'light') {
      mode = ui('mode', 'dark');
    } else {
      mode = ui('mode', 'light');
    }
  };

  return (
    <>
      <nav className="center-align navbar">
        <div>
          <Link className="nav_menu" to="/">
            Game
          </Link>
        </div>
        <div className="max">
          <Link className="nav_menu" to="/leaderboard">
            Leadersboard{' '}
          </Link>
        </div>

        {user ? (
          <>
            <div className="max">
              <Link className="nav_menu" to={`/profile/${user.username}`}>
                Profile
              </Link>
            </div>
            <button type="button" className="border" onClick={handleTheme}>
              Theme
            </button>
            <button type="button" onClick={handleLogout}>
              Logout
            </button>
          </>
        ) : (
          <>
            <button type="button" className="border" onClick={handleTheme}>
              Theme
            </button>
            <Link to="/sign-in">
              <button type="button">Sign-in</button>
            </Link>
          </>
        )}
      </nav>
      <main>
        <Outlet />
        <Footer />
      </main>
    </>
  );
}

export default NavBar;
