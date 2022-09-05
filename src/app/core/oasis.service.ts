import { Injectable, OnInit, OnDestroy } from "@angular/core";
import { Router } from "@angular/router";
import { Subscription } from "rxjs";
import { IDayStatistics, IUserStatistics, IUserWord, IUserWordOptions } from "src/types/IOptions";
import { IWord } from "src/types/IWord";
import { AuthService } from "../pages/auth/auth.service";
import { BookService } from "../pages/book/book.service";
import { ApiService } from "./api.service";
import { AudiocallService } from "./audiocall.service";

@Injectable({providedIn: 'root'})
export class OasisService implements OnInit {

  private _GetUserWordSubscription: Subscription | undefined;
  private _PostUserWordSubscription: Subscription | undefined;

  _getWordsSubs: Subscription | undefined;
  _getUserWordsSubs: Subscription | undefined;
  _PutUserStatistics: Subscription | undefined;
  _GetUserStatistics: Subscription | undefined;
  _getUserStatistic: Subscription | undefined;

  gameWords: IWord[] = [];
  userWords: IWord[] = [];
  userWordsIds: string[] = [];

  fromBook = this.bookService.fromBook;


  private existWordOptions!: IUserWordOptions;
  private statExistOptions!: IUserStatistics;

  private date = (new Date()).toISOString();

  group = Number(`${localStorage.getItem('group')}`);
  page = Math.floor(Math.random() * 30);

  userId = JSON.parse(`${localStorage.getItem('userData')}`).userId;

  constructor(private api: ApiService, private bookService: BookService, private audioCall: AudiocallService, private router: Router) {}

  ngOnInit(): void {
    if(this.fromBook) {
      this.choseLevel(0);
    }
  }

  fetchUserWords() {
    this._getUserWordsSubs = this.api.getUserWords(this.userId).subscribe((words: any) => {
      this.userWords = words;
      this.userWords.forEach((word: any) => {
        this.userWordsIds.push(word.wordId);
      })
    })
  }

  fetchWords(group: number, page: number) {
    this._getWordsSubs = this.api.getWords(group, page).subscribe((books: any) => {
      books.forEach((word: IWord) => {
        if(!this.userWordsIds.includes(word.id)) {
          this.gameWords.push(word);
        }
      });
      if(this.gameWords.length <= 10) {
        page--;
        if(page < 0) {
          page = 29;
        }
        this.fetchWords(group, page);
      }
      if(this.gameWords.length > 10) {
        this.gameWords = this.gameWords.slice(0, 10);
      }
    })
  }

  choseLevel(group: number) {
    this.gameWords = [];
    this.fetchUserWords();
    this.group = group;
    this.page = Math.floor(Math.random() * 30);
    if(this.fromBook) {
      this.group = +`${localStorage.getItem('group')}`;
      this.page = +`${localStorage.getItem('page')}`;
    }
    this.fetchWords(this.group, this.page);
    if(this.fromBook) {
      this.bookService.fromBook = false;
    }
  }

  private  getChangedOptions(options: IUserWordOptions, answer: boolean) {
    options.allTry++;
    options.games.oasis.right += +answer;
    options.games.oasis.wrong += +!answer;

    return options;
  }

  getUserWord(userId: string, wordId: string, answer?: boolean) {
    this._GetUserWordSubscription = this.api.getUserWord(userId, wordId).subscribe( {
      next: (word: any) => {
        this.existWordOptions = this.getChangedOptions((<IUserWord>word).optional, <boolean>answer);
        this.api.putUserWordRequest(userId, wordId, 'studied', this.existWordOptions);
      },
      error: (error: any) => {
        switch(error.status) {
          case 404:
            this.postUserWord(userId, wordId, 'studied', this.getDefaultOptions(<boolean>answer));
            break;
        }
      }
    });
  }

  getStatistics() {
    this._GetUserStatistics = this.api.getUserStatistics(this.userId).subscribe({
      next: (statistics: any) => {
        this.putStatistics(this.getChangedStatistics(<IUserStatistics>statistics))
      },
      error: (error: any ) => {
        switch(error.status) {
          case 404:
            this.putStatistics(this.getDefaultStatistics());
            break;
          case 401:
            this.router.navigate(['/authorization']);
            break;
        }
      }
    })
  }

  private  putStatistics(statistics: IUserStatistics) {
    this._PutUserStatistics = this.api.putUserStatistics(this.userId, statistics)
    .subscribe({
      error: (error: any) => {
        switch(error.status) {
          case 404:
            this.router.navigate(['/not-found']);
            break;
          case 401:
            this.router.navigate(['/authorization']);
            break;
        }
      }
    })
  }

  private getCurrentDateStatistucs(statistics: IUserStatistics) {
    const currentDateStatistics = statistics.optional.stat.allStat
      .filter((item) => {
        return item.date.slice(0, 10) === this.date.slice(0, 10)
      });

      return currentDateStatistics;
  }

  private getNewWords(statistics: IUserStatistics) {
    const newWordsFromAnswers = this.audioCall.answers
    .filter(item => !statistics.optional.stat.newWords.includes(item.id))
    .map(item => item.id);

    return newWordsFromAnswers;
  }

  private getDefaultStatistics(): IUserStatistics {
    const correctAnswers = this.audioCall.answers.filter(item => item.result).length;
    const defaultStatistics = {
      learnedWords: correctAnswers,
      optional: {
        stat: {
          allStat: [
            this.getDefaultDayStatistics()
        ],
          newWords: this.audioCall.answers.map(item => item.id),
        }
      }
    }
    return defaultStatistics;
  }

  private getDefaultDayStatistics(statistics?: IUserStatistics) {
    const correctAnswers = this.audioCall.answers.filter(item => item.result).length;
    const wrongAnswers = this.audioCall.answers.length - correctAnswers;
    const chain = this.getLengthOfLongestChain();
    const newWordsFromAnswer = statistics ? this.getNewWords(statistics).length : 0;

    const dayStatistics = {
      date: this.date,
      amountNewWordsPerDey: newWordsFromAnswer,
      correctAnswers: correctAnswers,
      games: {
        audiocall: {correct: 0, wrong: 0, chain: 0},
        sprint: {correct: 0, wrong: 0, chain: 0},
        oasis: {correct: correctAnswers, wrong: wrongAnswers, chain: chain},
      },
      allWords: this.audioCall.answers.length,
    };

    return dayStatistics;
  }


  private getChangedStatistics(statistics: IUserStatistics) {
    delete statistics.id;
    // статистика за сегодня
    const currentDateStat = this.getCurrentDateStatistucs(statistics);
    // newWordsAnswer - новые слова, если слова не встречаются в массиве слов
    const newWordsFromAnswer = this.getNewWords(statistics);
    const correctAnswers = this.audioCall.answers.filter(item => item.result).length;
    const wrongAnswers = this.audioCall.answers.length - correctAnswers;
    const chain = this.getLengthOfLongestChain();

    statistics.learnedWords += correctAnswers;
    if(newWordsFromAnswer.length) statistics.optional.stat.newWords.push(...newWordsFromAnswer);
    let dayStat: IDayStatistics;
    if(currentDateStat.length) {
      [dayStat, ] = currentDateStat;
      dayStat.amountNewWordsPerDey += newWordsFromAnswer.length;
      dayStat.correctAnswers += correctAnswers;
      dayStat.games.oasis.correct += correctAnswers;
      dayStat.games.oasis.wrong += wrongAnswers;
      dayStat.games.oasis.chain = chain > dayStat.games.oasis.chain
        ? chain
        : dayStat.games.oasis.chain;
      dayStat.allWords += this.audioCall.answers.length;
    } else {
      dayStat = this.getDefaultDayStatistics(statistics);
      statistics.optional.stat.allStat.push(dayStat);
    }

    return statistics;
  }

  getUserStatistics(userId: string, wordId: string, answer?: boolean) {
    this._getUserStatistic = this.api.getUserStatistics(userId).subscribe({
      next: (word: any) => {
        this.statExistOptions = this.getChangedStatistics((word).optional);
        this.api.putUserStatistics(userId, this.statExistOptions)
      }
    })
  }

  private postUserWord(userId: string, wordId: string, difficulty: 'difficult' | 'studied', options: IUserWordOptions) {
    this._PostUserWordSubscription = this.api.postUserWordRequest(userId, wordId, difficulty, options).subscribe((resp: any) => resp);
  }

  private  getDefaultOptions(answer: boolean) {
    const options = {
      isDeleted: false,
      addTime: (new Date()).toISOString(),
      games: {
        sprint: { right: 0, wrong: 0 },
        savanna: { right: 0, wrong: 0 },
        oasis: { right: 0 | +answer, wrong: 0 | +!answer },
        audioCall: { right: 0, wrong: 0 },
      },
      allTry: 1
    }
    return options;
  }


  getLengthOfLongestChain() {
    const chain = this.audioCall.answers
      .map(item => item.result ? 1 : 0)
      .join('')
      .split('0')
      .map(item => item.length)

      return Math.max(...chain);
  }

  ngOnDestroy(): void {
    if(this._getUserWordsSubs) {
      this._getUserWordsSubs.unsubscribe();
    }
    if(this._getWordsSubs) {
      this._getWordsSubs.unsubscribe();
    }

    if(this._GetUserWordSubscription) {
      this._GetUserWordSubscription.unsubscribe();
    }
    if (this._PostUserWordSubscription) {
      this._PostUserWordSubscription.unsubscribe();
    }
    if(this._PutUserStatistics) {
      this._PutUserStatistics.unsubscribe()
    }
    if(this._GetUserStatistics) {
      this._GetUserStatistics.unsubscribe()
    }
  }

  unsubscribe(): void {
    if(this._getUserWordsSubs) {
      this._getUserWordsSubs.unsubscribe();
    }
    if(this._getWordsSubs) {
      this._getWordsSubs.unsubscribe();
    }

    if(this._GetUserWordSubscription) {
      this._GetUserWordSubscription.unsubscribe();
    }
    if (this._PostUserWordSubscription) {
      this._PostUserWordSubscription.unsubscribe();
    }
    if(this._PutUserStatistics) {
      this._PutUserStatistics.unsubscribe()
    }
    if(this._GetUserStatistics) {
      this._GetUserStatistics.unsubscribe()
    }
  }
}
