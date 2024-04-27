import React from 'react';
import { useNavigate } from 'react-router-dom';
import './page404.css';

function Page404(): JSX.Element {
  const navigate = useNavigate();

  const homePage = () => {
    navigate('/');
  };

  return (
    <div className="page-404">
      <h1>404 - Страница не найдена</h1>
      <img
        style={{ width: '100vw', maxHeight: '48vw' }}
        src="/img/404/404_castle_1.gif"
        alt="logo404"
      />

      <button
        type="button"
        className="btn-404"
        style={{ width: '10%', height: '5%', fontWeight: 'bold' }}
        onClick={homePage}
      >
        Вернуться на главную
      </button>
    </div>
  );
}

export default Page404;
