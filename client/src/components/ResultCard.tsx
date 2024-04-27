/* eslint-disable @typescript-eslint/no-misused-promises */
import React from 'react';
import type { Result } from '../pages/Profile/type';

function ResultCard({ result }: { result: Result }): JSX.Element {
  const getCorrectTime = (seconds: number) => {
    const timer = seconds < 0 ? '-' : '';
    return timer + new Date(Math.abs(seconds) * 1000).toISOString().substr(11, 8);
  };

  return (
    <article
      className="border"
      style={{ minWidth: '10rem', textAlign: 'center', margin: '0.5rem 1rem' }}
    >
      <p style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '1rem' }}>
        {new Date(result.createdAt).toLocaleDateString('ru-RU')}
      </p>
      <p>Difficult: {result.Level.difficult}</p>
      <p>Score: {result.score}</p>
      <p>Time: {getCorrectTime(result.time)}</p>
      <p>Monsters: {result.monsters}</p>
    </article>
  );
}

export default ResultCard;
