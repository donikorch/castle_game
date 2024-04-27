import React, { useState, useRef, useEffect, useMemo } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../app/store';
import * as thunk from '../pages/Game/gameSlice';
import type { RootState } from '../app/store';
import type { Level, Theme } from '../pages/Game/type';
import type { User } from '../pages/LogReg/type';
import type { ResultWithoutId } from '../pages/Profile/type';
import { fetchWordsFromFile } from '../app/api';

type Monster = {
  id: number;
  right: number;
  word: string;
};

function Game({
  setCurrentMonsterWord,
  errorWord,
  setErrorWord,
  setMonsterRemoved,
  language,
}: {
  setCurrentMonsterWord: (arg: string) => void;
  errorWord: boolean;
  setErrorWord: (arg: boolean) => void;
  setMonsterRemoved: (arg: boolean) => void;
  language: string;
}): JSX.Element {
  const [monsters, setMonsters] = useState<Monster[]>([]);
  const [words, setWords] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [castleHealth, setCastleHealth] = useState<number>(100);
  const [timer, setTimer] = useState<number>(0);
  const [firstMonster, setFirstMonster] = useState<boolean>(true);
  const [score, setScore] = useState<number>(0);
  const [killedMonsters, setKilledMonsters] = useState<number>(0);
  const [gameStarted, setGameStarted] = useState<boolean>(false);
  const [gameOver, setGameOver] = useState<boolean>(false);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [monsterSpeed, setMonsterSpeed] = useState<number>(1);
  const enterPressed = useRef<boolean>(false);
  const [timerRunning, setTimerRunning] = useState<boolean>(true);
  const [gameResults, setGameResults] = useState<{
    time: number;
    score: number;
    monstersKilled: number;
  } | null>(null);

  const { difficultId } = useParams<{ difficultId: string }>();
  const { level, theme }: { level: Level | undefined; theme: Theme | undefined } = useAppSelector(
    (store: RootState) => store.game,
  );

  const user: User | undefined = useAppSelector((store: RootState) => store.auth.user);

  const dispatch = useAppDispatch();
  const navigation = useNavigate();

  const getCorrectTime = (seconds: number) => {
    const timer = seconds < 0 ? '-' : '';
    return timer + new Date(Math.abs(seconds) * 1000).toISOString().substr(11, 8);
  };

  const increaseScore = useMemo(
    () =>
      (points: number): void => {
        setScore((prevScore) => prevScore + points);
      },
    [],
  );

  const decreaseScore = useMemo(
    () =>
      (points: number): void => {
        setScore((prevScore) => Math.max(prevScore - points, 0));
      },
    [],
  );

  const convertResultToLevel = useMemo(
    () =>
      (score: number, killedMonsters: number, timer: number): number => {
        const scoreWeight: number = 0.5;
        const killedMonstersWeight: number = 0.3;
        const timerWeight: number = 0.2;

        const totalResult: number =
          score * scoreWeight + killedMonsters * killedMonstersWeight - timer * timerWeight;

        let newLevel: number = user?.user_level ?? 1;

        const levelThresholds: number[] = [1000, 2000, 3000, 4000, 5000];

        for (let i = 0; i < levelThresholds.length; i += 1) {
          if (totalResult >= levelThresholds[i]) {
            newLevel += i + 1;
          } else {
            break;
          }
        }

        return newLevel;
      },
    [user],
  );

  useEffect(() => {
    dispatch(thunk.loadLevel(Number(difficultId))).catch(console.log);
    if (user) {
      dispatch(thunk.loadTheme(user.theme_id)).catch(console.log);
    }
  }, []);

  useEffect(() => {
    if (gameOver) {
      const result: ResultWithoutId = {
        user_id: user?.id ?? 0,
        level_id: Number(difficultId),
        time: timer,
        score,
        monsters: killedMonsters,
      };

      const newLevel: number = convertResultToLevel(score, killedMonsters, timer);

      dispatch(thunk.updateLevel(newLevel)).catch(console.log);
      dispatch(thunk.saveResult(result)).catch(console.log);
    }
  }, [gameOver]);

  useEffect(() => {
    if (gameOver) {
      setTimerRunning(false);
      setGameResults({
        time: timer,
        score,
        monstersKilled: killedMonsters,
      });
    }
  }, [gameOver, timer, score, killedMonsters]);

  const generateMonster = (): void => {
    const newMonsterWord: string = words[Math.floor(Math.random() * words.length)];

    const newMonster: Monster = {
      id: Math.random(),
      right: -10,
      word: newMonsterWord,
    };

    setMonsterRemoved(false);
    setMonsters((prevMonsters) => [...prevMonsters, newMonster]);
  };

  useEffect(() => {
    if (level && gameStarted) {
      if (language === 'ru') {
        fetchWordsFromFile()
          .then((words) => {
            const randomWords = words
              .filter((word) => word.length === level.word_length)
              .sort(() => Math.random() - 0.5)
              .slice(0, 1000);
            setWords(randomWords);
            setCurrentMonsterWord(randomWords[0]);
            setIsLoading(false);
          })
          .catch((error) => {
            console.error('Error fetching words:', error);
            setIsLoading(false);
          });
      } else {
        axios
          .get<string[]>(
            `https://random-word-api.herokuapp.com/word?number=1000&length=${level.word_length}`,
          )
          .then((response) => {
            setWords(response.data);
            setCurrentMonsterWord(response.data[0]);
            setIsLoading(false);
          })
          .catch((error) => console.error(error));
      }

      setIsLoading(true);
    }
  }, [level, gameStarted]);

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent): void => {
      if (event.key === 'Enter') {
        setGameStarted(true);
        enterPressed.current = true;
      } else if (event.key === ' ') {
        setIsPaused((prevIsPaused) => !prevIsPaused);
        setCurrentMonsterWord('PAUSE');
      } else if (event.key === 'Escape') {
        navigation('/lobby');
      }
    };

    window.addEventListener('keydown', handleKeyPress);

    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, []);

  useEffect(() => {
    let timeout: number;

    const generateMonsterWithRandomInterval = (): void => {
      generateMonster();

      const randomInterval: number = Math.floor(Math.random() * 3000) + 1000;
      timeout = setTimeout(generateMonsterWithRandomInterval, randomInterval);
    };

    if (!isLoading && gameStarted && !isPaused && !gameOver) {
      if (firstMonster) {
        setFirstMonster(false);
      } else {
        generateMonsterWithRandomInterval();
      }
    }

    return () => clearTimeout(timeout);
  }, [words, isLoading, firstMonster, gameStarted, isPaused, gameOver]);

  useEffect(() => {
    let interval: number;
    if (!isLoading && gameStarted && !gameOver) {
      interval = setInterval(() => {
        if (!isPaused) {
          setMonsters((prevMonsters) =>
            prevMonsters.map((monster) => ({
              ...monster,
              right: monster.right + monsterSpeed,
            })),
          );

          setMonsters((prevMonsters) => {
            const filteredMonsters: Monster[] = prevMonsters.filter((monster, index) => {
              if (monster.right >= 60) {
                setCastleHealth((prevHealth) => {
                  if (prevHealth >= 10) {
                    decreaseScore(50);
                  }
                  return prevHealth - 10;
                });
                setMonsterRemoved(true);
                return false;
              }

              if (errorWord && index === 0) {
                setMonsterRemoved(true);
                setErrorWord(false);
                increaseScore(100);
                setKilledMonsters((prevKilledMonsters) => prevKilledMonsters + 1);
                return false;
              }

              setMonsterRemoved(false);
              return true;
            });

            const nextMonsterWord: string | undefined = filteredMonsters[0]?.word;
            if (nextMonsterWord) {
              setCurrentMonsterWord(nextMonsterWord);
            }

            return filteredMonsters;
          });
        }
      }, 100);
    }

    return () => clearInterval(interval);
  }, [errorWord, isPaused, isLoading, gameStarted, gameOver]);

  useEffect(() => {
    if (gameStarted && !isPaused && timerRunning && !gameOver) {
      const interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer + 1);
        if (timer % 15 === 0) {
          setMonsterSpeed((prevSpeed) => prevSpeed + 0.25);
        }
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [gameStarted, isPaused, timer, timerRunning, gameOver]);

  if (!gameStarted || !enterPressed.current) {
    return <div className="message">Press Enter to Start the Game</div>;
  }

  if (castleHealth <= 0 && !gameOver) {
    setGameOver(true);
  }

  if (gameOver) {
    setCurrentMonsterWord('...');

    return (
      <div className="message">
        <div className="total-score">Press Escape to return to the lobby</div>
        <div>Game Over</div>
        <div className="total-score">
          <p>Score: {gameResults?.score}</p>
          <p>Time: {getCorrectTime(timer)}</p>
          <p>Monsters Killed: {gameResults?.monstersKilled}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="game-container">
      {isLoading ? (
        <div className="message">Loading...</div>
      ) : (
        <div className="rectangle" style={{ backgroundImage: `url('${theme?.background}')` }}>
          <div className="castle">
            <div className="health-container">
              <div className="health" style={{ width: `${castleHealth}%` }} />
              <div className="health-border" />
            </div>
            <img
              src={`${theme?.castle}`}
              alt="castle"
              style={{
                marginTop: theme?.id !== 3 ? '-2vw' : '-0.5vw',
                width: theme?.id === 2 ? '22vw' : '20vw',
                height: theme?.id === 2 ? '22vw' : '20vw',
              }}
            />
          </div>
          <div className="timer" style={{ textShadow: '2px 2px 5px #000' }}>
            Time: {getCorrectTime(timer)}
          </div>
          <div className="score" style={{ textShadow: '2px 2px 5px #000' }}>
            {' '}
            Score: {score}
          </div>
          {monsters.map((monster) => (
            <div key={monster.id} className="monster" style={{ right: `${monster.right}vw` }}>
              <div
                className="word"
                style={{
                  marginTop: theme?.id === 3 ? '-4vw' : '0rw',
                }}
              >
                {monster.word}
              </div>
              <img
                src={`${theme?.enemy}`}
                alt="monster"
                style={{
                  width: theme?.id === 2 ? '10vw' : '15vw',
                  height: theme?.id === 2 ? '10vw' : '15vw',
                  marginLeft: theme?.id === 2 ? '3vw' : '0vw',
                  transform: theme?.id === 3 ? 'scaleX(-1) ' : 'none',
                  marginTop: theme?.id !== 2 ? '-3vw' : '2vw',
                }}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Game;
