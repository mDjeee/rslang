export interface IUserWord {
  difficulty: 'string';
  optional: IUserWordOptions;
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
  newWords: number;
  correctAnswers: number;
  allWords: number;
}
