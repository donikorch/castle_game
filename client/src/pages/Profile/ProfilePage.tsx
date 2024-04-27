/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/store';
import ResultCard from '../../components/ResultCard';
import * as thunkProfile from './profileSlice';
import * as thunk from '../LogReg/authSlice';
import Modal from '../../components/Modal';
import './profilePage.css';

function ProfilePage(): JSX.Element {
  const { username } = useParams();
  // Селекторы
  const results = useAppSelector((store) => store.profile.results);
  const error = useAppSelector((store) => store.profile.error);
  const user = useAppSelector((store) => store.profile.user);

  const dispatch = useAppDispatch();
  // Cтейт модального окна
  const [isModalOpen, setIsModalOpen] = useState(false);
  // Cтейты для формы
  const [email, setUserEmail] = useState('');
  const [password, setUserPassword] = useState('');
  const [img, setImg] = useState<File>();

  // Cкрытие форм
  const [form, setForm] = useState(false);
  const [theme, changeTheme] = useState<number>();

  const handleImageClick = (th: number): void => {
    changeTheme(th);
  };

  useEffect(() => {
    if (username) {
      dispatch(thunkProfile.loadUser(username)).catch(console.log);
    }
    dispatch(thunkProfile.loadResults()).catch(console.log);
    // dispatch(thunk.checkUser()).catch(console.log)
  }, []);
  // Модальное
  const closeModal = (): void => {
    setIsModalOpen(false);
    dispatch(thunk.clearError());
  };

  useEffect(() => {
    if (user) {
      changeTheme(user?.theme_id);
    }
  }, [user]);

  useEffect(() => {
    if (error) {
      setIsModalOpen(true);
    }
  }, [error]);
  useEffect(() => {
    if (theme) {
      dispatch(thunk.changeTheme(theme)).catch(console.log);
    }
  }, [theme]);

  const updateUser = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    const formData = new FormData();
    if (img) {
      formData.append('url', img);
    }
    formData.append('email', email);
    formData.append('password', password);

    dispatch(thunkProfile.updateUser(formData)).catch(console.log);
  };

  return (
    <>
      {user ? (
        <div>
          <article
            className="border"
            style={{ width: '38rem', margin: '0 auto', marginTop: '1rem' }}
          >
            <div className="row change-profile">
              <img
                className="circle "
                style={{ width: '17.5rem', height: '17.5rem' }}
                src={`${user.img}`}
                alt="avatar"
              />

              <div className="max" style={{ fontSize: '1.3rem', margin: '3rem 0 0 1.7rem' }}>
                <h2>{user.username}</h2>
                <p style={{ marginTop: '1.7rem' }}>lvl: {user.user_level}</p>
                <p>email: {user.email}</p>

                <a
                  className="change-link"
                  style={{ fontSize: '1rem' }}
                  onClick={() => {
                    setForm(!form);
                  }}
                >
                  Изменить профиль <i>edit</i>
                </a>
              </div>
            </div>
          </article>

          <p>
            {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions */}
          </p>
          {form && (
            <article className="border form-update" style={{ width: '38rem', margin: '0 auto' }}>
              <form onSubmit={updateUser}>
                <br />
                <label style={{ fontSize: '20px' }}> Изменить почту</label>
                <input
                  className="field border"
                  type="email"
                  placeholder={user.email}
                  onChange={(event) => setUserEmail(event.target.value)}
                />
                <label style={{ fontSize: '20px' }}>Изменить пароль</label>
                <input
                  className="field border"
                  type="password"
                  onChange={(event) => setUserPassword(event.target.value)}
                />
                <button className="border" type="button">
                  <label style={{ fontSize: '18px' }}>Новый Аватар</label>
                  <input
                    className="field border"
                    type="file"
                    name="avatar"
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                      if (event.target.files && event.target.files.length > 0)
                        setImg(event.target.files[0]);
                    }}
                  />
                </button>{' '}
                <button
                  className="btn-save"
                  style={{ fontSize: '18px', marginLeft: '24rem' }}
                  type="submit"
                >
                  Сохранить
                </button>
              </form>
            </article>
          )}
          <p className="prof_center">Выбор темы для игры:</p>
          <div className="radio-buttons">
            {['01.jpg', '02.jpg', '03.jpg'].map((imageName) => (
              <div className="brd">
                <div
                  style={{ margin: '1rem', borderRadius: '3%' }}
                  className={theme === +imageName[1] ? 'selected' : ''}
                  key={imageName}
                  onClick={() => handleImageClick(+imageName[1])}
                >
                  <img src={`/img/${imageName}`} alt={imageName} />
                </div>
              </div>
            ))}
          </div>

          {results[0] ? (
            <>
              <p className="prof_center"> Результаты игр:</p>

              <div className="row game-res" style={{ flexWrap: 'wrap', marginBottom: '3rem' }}>
                {results.map((result) => (
                  <ResultCard key={result.id} result={result} />
                ))}
              </div>
            </>
          ) : (
            <p className="prof_center" style={{ marginTop: '7rem' }}>
              Игровая статистика отсутствует
            </p>
          )}
        </div>
      ) : (
        <div> </div>
      )}
      {error && (
        <Modal isOpen={isModalOpen} onClose={closeModal}>
          {error}
        </Modal>
      )}
    </>
  );
}

export default ProfilePage;
