import React from 'react';
import './profileModal.css';
import type { Result, User } from '../pages/Leadersboard/type';

function ProfileModal({
  isOpen,
  onClose,
  leader,
}: {
  isOpen: boolean;
  onClose: () => void;
  leader: User;
}): JSX.Element | null {
  if (!isOpen) {
    return null;
  }

  const getCorrectTime = (seconds: number) => {
    const timer = seconds < 0 ? '-' : '';
    return timer + new Date(Math.abs(seconds) * 1000).toISOString().substr(11, 8);
  };

  return (
    <>
      {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions */}
      <div className={`modal-backdrop ${isOpen ? 'active' : ''}`} onClick={onClose} />
      <dialog className={`modal ${isOpen ? 'active' : ''} profile_modal`}>
        <img
          className="round extra"
          style={{ width: '14rem', height: '14rem' }}
          src={leader.img}
          alt="user avatar"
        />
        <p style={{ fontSize: '1.5rem', marginTop: '2.5rem' }}>Nickame: {leader.username}</p>
        <p style={{ fontSize: '1.5rem' }}>lvl: {leader.user_level}</p>
        <p style={{ fontSize: '1rem', marginTop: '2.5rem' }}>
          Reg. Date: {new Date(leader.createdAt).toLocaleDateString('ru-RU')}
        </p>

        <div className="game_result">
          {leader.Results.length > 0 ? (
            <div className="scroll size_1">
              <table className="border center-align table_1">
                <thead className="fixed">
                  <tr className="table_2">
                    <th>Game</th>
                    <th>Score</th>
                    <th>Time</th>
                    <th>Difficult</th>
                    <th>Monsters</th>
                  </tr>
                </thead>

                <tbody>
                  {leader.Results.map((el: Result, index) => (
                    <tr key={el.id}>
                      <td>{index + 1}</td>
                      <td>{el.score}</td>
                      <td>{getCorrectTime(el.time)}</td>
                      <td>{el.Level.difficult}</td>
                      <td>{el.monsters}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p style={{ margin: '5% 0 0 12%', fontSize: '1.8rem' }}>
              Игровая статистика отсутствует
            </p>
          )}
        </div>
        <div>
          <button type="button" onClick={onClose}>
            Close
          </button>
        </div>
      </dialog>
    </>
  );
}

export default ProfileModal;
