export type Level = {
  id: number;
  difficult: string;
  word_length: number;
};

export type LevelsType = {
  levels: Level[];
  error: string | undefined;
};
