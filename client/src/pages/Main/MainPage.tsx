import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import type { User } from '../LogReg/type';
import type { RootState } from '../../app/store';
import './mainPage.css';


function MainPage(): JSX.Element {
  const user: User | undefined = useSelector((store: RootState) => store.auth.user);

  return (
    <article className="welcome no-padding center-align middle-align">
      <div className="overlay-content">
        <div className="padding">
          <h1>Welcome</h1>
          <br />
          <div>
            {user ? (
              <Link to="/lobby">
                <button style={{fontSize: '25px', paddingTop: '1rem'}} type="button" className="small-round extra small-elevate">
                  PLAY
                </button>
              </Link>
            ) : (
              <Link to="/sign-up">
                <button type="button" className="small-round extra small-elevate">
                  PLAY
                </button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}

export default MainPage;
