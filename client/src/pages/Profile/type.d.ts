import type { User } from '../LogReg/type';

export type Result = {
  id: number;
  user_id: number;
  level_id: number;
  time: number;
  score: number;
  monsters: number;
  Level: Level;
  createdAt: Date;
};

export type Level = {
  id: number;
  difficult: string;
  word_length: number;
  castle_id: number;
};

export type Results = {
  user: User | undefined;
  results: Result[] | [];
  error: string | undefined;
};

export type ResultWithoutId = Omit<Result, 'id' | 'Level' | 'createdAt'>;
