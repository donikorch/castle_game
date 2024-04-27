export type Theme = {
  id: number;
  layout: string;
  castle: string;
  enemy: string;
  background: string;
};

export type Level = {
  id: number;
  difficult: string;
  word_length: number;
  castle_id: number;
};

export type LevelType = {
  level: Level | undefined;
  theme: Theme | undefined;
  error: string | undefined;
};
