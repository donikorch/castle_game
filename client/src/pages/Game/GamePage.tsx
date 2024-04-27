import React, { useState } from 'react';
import KeyboardWrapper from '../../components/KeyboardWrapper';
import Game from '../../components/Game';
import './gamePage.css'

function GamePage(): JSX.Element {
  const [currentMonsterWord, setCurrentMonsterWord] = useState<string>('...');
  const [errorWord, setErrorWord] = useState<boolean>(false);
  const [monsterRemoved, setMonsterRemoved] = useState<boolean>(false);
  const [language, setLanguage] = useState<string>('');

  const handleLanguageChange = (newLanguage: string) => {
    setLanguage(newLanguage);
  };

  return (
    <div className="container">
      {language ? (
        <>
          <Game
            setCurrentMonsterWord={setCurrentMonsterWord}
            errorWord={errorWord}
            setErrorWord={setErrorWord}
            setMonsterRemoved={setMonsterRemoved}
            language={language}
          />
          <KeyboardWrapper
            currentMonsterWord={currentMonsterWord}
            setErrorWord={setErrorWord}
            monsterRemoved={monsterRemoved}
            language={language}
          />
        </>
      ) : (
        <article className="welcome no-padding center-align middle-align">
          <div className="padding lang_shadow_1">
            <button type="button" onClick={() => handleLanguageChange('en')} className='small-round extra small-elevate' style={{fontSize: '25px', marginTop: '2.8rem'}}>
              English
            </button>
            <button type="button" onClick={() => handleLanguageChange('ru')} className='small-round extra small-elevate' style={{fontSize: '25px', marginTop: '2rem'}}>
              Русский
            </button>
          </div>
        </article>
      )}
    </div>
  );
}

export default GamePage;
