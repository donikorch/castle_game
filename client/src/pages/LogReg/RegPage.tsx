/* eslint-disable @typescript-eslint/no-misused-promises */
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGoogleLogin } from '@react-oauth/google';
import { useAppDispatch, useAppSelector } from '../../app/store';
import * as thunk from './authSlice';
import Modal from '../../components/Modal';

function RegPage(): JSX.Element {
  const error = useAppSelector((store) => store.auth.error);
  const user = useAppSelector((store) => store.auth.user);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [login, setLogin] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [checkPassword, setCheckPassword] = useState('');
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const loginWithGoogle = useGoogleLogin({
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    onSuccess: (codeResponse) => dispatch(thunk.googleAuth(codeResponse)),
    flow: 'auth-code',
  });
  const onHandleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();

    dispatch(
      thunk.regUser({
        username: login,
        email,
        password,
        checkPassword,
        user_level: 0,
      }),
    ).catch(console.log);
  };
  const closeModal = (): void => {
    setIsModalOpen(false);
    dispatch(thunk.clearError());
  };
  useEffect(() => {
    if (error) {
      setIsModalOpen(true);
    }
    if (user) {
      navigate('/');
    }
  }, [error, user, navigate]);
  return (
    <>
      <article className="logreg no-padding">
        <div className="form-log padding absolute center middle shadow_1 form_2">
          <form onSubmit={onHandleSubmit}>
            <div className="field label border fill extra" style={{ marginTop: '1.75rem' }}>
              <input
                type="text"
                name="login"
                required
                value={login}
                onChange={(e) => setLogin(e.target.value)}
              />
              <label>Username</label>
            </div>

            <div className="field label border fill extra">
              <input
                type="email"
                name="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <label>Email</label>
            </div>

            <div className="field label border fill extra">
              <input
                type="password"
                name="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <label>Password</label>
            </div>

            <div className="field label border fill extra">
              <input
                type="password"
                name="password"
                required
                value={checkPassword}
                onChange={(e) => setCheckPassword(e.target.value)}
              />
              <label>Repeat password</label>
            </div>

            <button
              type="submit"
              className="small-round extra small-elevate"
              style={{ width: '20rem' }}
            >
              Sign-Up
            </button>
          </form>
          <p>
            <button
              type="button"
              className="small-round extra small-elevate"
              onClick={() => loginWithGoogle()}
              style={{ width: '20rem', marginTop: '1.2rem' }}
            >
              Sign-Up with Google
            </button>
          </p>
        </div>
      </article>
      {error && (
        <Modal isOpen={isModalOpen} onClose={closeModal}>
          {error}
        </Modal>
      )}
    </>
  );
}

export default RegPage;
