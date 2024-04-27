import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import * as thunk from './lobbySlice';
import { useAppDispatch, useAppSelector } from '../../app/store';
import './lobbyPage.css';

function LobbyPage(): JSX.Element {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(thunk.loadLevels()).catch(console.log);
  }, []);

  const levels = useAppSelector((store) => store.lobby.levels);

  return (
    <article className="welcome no-padding center-align middle-align">
      <div className="padding shadow_1">
        <div className='btn-style' style={{display: 'flex', flexDirection: 'column'}}>
        <h2>Levels</h2>
          {levels.map((level) => (
            <Link className='lvl_link' key={level.id} to={`/level/${level.id}`}>
              <button style={{fontSize: '1.5vw'}} type="button" className="small-round extra small-elevate" >
                {level.difficult}
              </button>
            </Link>
          ))}
        </div>
      </div>
    </article>
  );
}

export default LobbyPage;
