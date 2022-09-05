export interface IUserWord {
  id?: string;
  difficulty: 'string';
  optional: IUserWordOptions;
  wordId?: string;
}

export interface IUserWordOptions {
  isDeleted: boolean;
  addTime: string;
  games: {
    sprint: { right: number, wrong: number };
    savanna: { right: number, wrong: number };
    oasis: { right: number, wrong: number };
    audioCall: { right: number, wrong: number };
  };
  allTry: number;
}

export interface IUserStatistics{
  id?: string;
  learnedWords: number;
  optional: {
    stat: {
      allStat: IDayStatistics[];
      newWords: string[];
    };
  }
}

export type IDayStatistics = {
  date: string;
  amountNewWordsPerDey: number;
  correctAnswers: number;
  games: {
    audiocall: {correct: number, wrong: number, chain: number},
    sprint: {correct: number, wrong: number, chain: number},
    oasis: {correct: number, wrong: number, chain: number},
  };
  allWords: number;
}
