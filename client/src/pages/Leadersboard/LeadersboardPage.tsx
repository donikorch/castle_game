import React, { useEffect, useMemo, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/store';
import * as thunk from './usersSlice';
import './LeadersboardPage.css';
import ProfileModal from '../../components/ProfileModal';
import type { User } from './type';

function LeadersboardPage(): JSX.Element {
  const [visibleLeaders, setVisibleLeaders] = useState<number>(10);
  const leaders: User[] = useAppSelector((store) => store.users.users);
  const [modalWindow, setModalWindowOpen] = useState<boolean>(false);
  const [bluerEffect, setbluerEffect] = useState<boolean>(false);
  const [user, setUser] = useState<User | null>(null);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(thunk.loadLeaders()).catch((error) => {
      console.error('Ошибка загрузки:', error);
    });
  }, [dispatch]);

  const closeModal = (): void => {
    setModalWindowOpen(false);
    setbluerEffect(false);
  };

  useEffect(() => {
    if (modalWindow) {
      setModalWindowOpen(true);
    }
  }, [modalWindow]);

  const sortedLeaders = useMemo<User[]>(() => {
    const sorted = [...leaders].sort((a, b) => b.user_level - a.user_level);
    return sorted.map((leader, index) => ({ ...leader, rank: index + 1 }));
  }, [leaders]);

  const handleLoadMore = (): void => {
    setVisibleLeaders((prevVisible: number) => prevVisible + 10);
  };

  const openProfileModal = (leader: User): void => {
    setUser(leader);
    setbluerEffect(true);
    setModalWindowOpen(true);
  };

  return (
    <>
      <div className={`profilePage ${bluerEffect ? 'blur-effect' : ''}`}>
        <div className="leaders_container">
          {/* <h2 style={{ color: 'tomato', textAlign: 'center' }}>Our Leaders</h2> */}
          <table className="stripes ">
            <thead>
              <tr style={{fontSize: '1.3vw'}}>
                <th>Rank</th>
                <th>Nickname</th>
                <th>Level</th>
                <th>Registration Date</th>
              </tr>
            </thead>
            <tbody>
              {sortedLeaders.slice(0, visibleLeaders).map((leader, index) => (
                <tr className="leader-str" style={{ fontSize: '1.2vw' }} onClick={() => openProfileModal(leader)} key={leader.id}>
                  <td className="table_rank" >
                    {index + 1}
                  </td>
                  <td>
                    <img className="circle large" style={{width: '4vw', height: '4vw'}} src={leader.img} alt="user avatar" />
                    <span
                      style={{
                        fontWeight: 'bold',
                        marginLeft: '15px',
                      }}
                    >
                      {leader.username}
                    </span>
                  </td>
                  <td style={{ fontWeight: 'bold' }}>{leader.user_level}</td>
                  <td>{new Date(leader.createdAt).toLocaleDateString('ru-RU')}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="btn-pagin">
          {visibleLeaders < sortedLeaders.length && (
            <button type="button" onClick={handleLoadMore} style={{marginBottom: '2vw'}}>
              More users
            </button>
          )}
        </div>
      </div>
      {user && <ProfileModal isOpen={modalWindow} onClose={closeModal} leader={user} />}
    </>
  );
}

export default LeadersboardPage;
