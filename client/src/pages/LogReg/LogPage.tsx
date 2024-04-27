import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useGoogleLogin } from '@react-oauth/google';
import { useAppDispatch, useAppSelector } from '../../app/store';
import * as thunk from './authSlice';
import Modal from '../../components/Modal';
import './log-reg.css';

function LogPage(): JSX.Element {
  const error = useAppSelector((store) => store.auth.error);
  const user = useAppSelector((store) => store.auth.user);
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dispatch = useAppDispatch();

  const loginWithGoogle = useGoogleLogin({
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    onSuccess: (codeResponse) => dispatch(thunk.googleAuth(codeResponse)),
    flow: 'auth-code',
  });

  const navigate = useNavigate();

  const onHandleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();

    dispatch(thunk.logUser({ username: login, password })).catch(console.log);
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
        <div className="form-log padding absolute center middle shadow_1 form_1">
          <form onSubmit={onHandleSubmit}>
            <div className="field label border fill extra" style={{ marginTop: '1.2rem' }}>
              <input
                type="text"
                name="login"
                value={login}
                onChange={(e) => setLogin(e.target.value)}
              />
              <label>Username</label>
            </div>

            <div className="field label border fill extra">
              <input
                type="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <label>Password</label>
            </div>

            <button
              type="submit"
              className="small-round extra small-elevate"
              style={{ width: '20rem' }}
            >
              Continue
            </button>
          </form>
          <Link to="/sign-up" style={{ marginTop: '1rem' }}>
            Sign-Up
          </Link>
          <p>
            <button
              type="button"
              className="small-round extra small-elevate"
              onClick={() => loginWithGoogle()}
              style={{ width: '20rem' }}
            >
              Sign-In with Google
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

export default LogPage;
