import { Injectable } from '@angular/core';
import { Subscription } from 'rxjs';
import { baseUrl } from 'src/api/baseUrl';
import { answer } from 'src/types/audiocall-answer';
import { IDayStatistics, IUserStatistics, IUserWord, IUserWordOptions } from 'src/types/IOptions';
import { Router } from "@angular/router";
import { IWord } from 'src/types/IWord';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class AudiocallService {
  private _GetWordsSubscription: Subscription | undefined;
  private _GetUserWordSubscription: Subscription | undefined;
  private _PostUserWordSubscription: Subscription | undefined;
  private _GetUserStatistics: Subscription | undefined;
  private _PutUserStatistics: Subscription | undefined;

  words: IWord[] = [];
  index: number = -1;
  answers: answer[] = [];
  private randomWords!: string[];
  private userId!: string;
  private existWordOptions!: IUserWordOptions;
  private date = (new Date()).toISOString();
  chain!: number;

  constructor(private api: ApiService, private router: Router) { }

  fetchWords(group: number, page: number){
    this._GetWordsSubscription = this.api.getWords(group, page).subscribe(books => {
      this.words = books;
      this.words.sort(() => this.getRandomIntInclusive(-1, 1)).splice(10);
    })
  }

  private getUserWord(userId: string, wordId: string, answer?: boolean) {
    this._GetUserWordSubscription = this.api.getUserWord(userId, wordId).subscribe( {
      next: word => {
        this.existWordOptions = this.getChangedOptions((<IUserWord>word).optional, <boolean>answer);
      },
      error: error => {
        switch(error.status) {
          case 404:
            this.postUserWord(userId, wordId, 'studied', this.getDefaultOptions(<boolean>answer));
            break;
          case 401:
            this.router.navigate(['/authorization']);
            break;
          case 200:
            this.postUserWord(userId, wordId, 'studied', this.existWordOptions);
            break;
        }
      }
    });
  }

  private postUserWord(userId: string, wordId: string, difficulty: 'difficult' | 'studied', options: IUserWordOptions) {
    this._PostUserWordSubscription = this.api.postUserWordRequest(userId, wordId, difficulty, options).subscribe(resp => resp);
  }

  getStatistics() {
    this._GetUserStatistics = this.api.getUserStatistics(this.userId).subscribe({
      next: statistics => {
        console.log(statistics);
        // this.putStatistics(this.getDefaultStatistics());
        this.putStatistics(this.getChangedStatistics(<IUserStatistics>statistics))
      },
      error: error => {
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
    console.log('put')
    this._PutUserStatistics = this.api.putUserStatistics(this.userId, statistics)
    .subscribe({
      error: error => {
        switch(error.status) {
          case 404:
            console.log('something wrong')
            break;
          case 401:
            this.router.navigate(['/authorization']);
            break;
        }
      }
    })
  }

  private  getChangedStatistics(statistics: IUserStatistics) {
    delete statistics.id;
    // статистика за сегодня
    const currentDateStat = statistics.optional.stat.allStat
      .filter((item) => item.date.slice(0, 10) === this.date.slice(0, 10));
    // newWordsAnswer - новые слова, если слова не встречаются в массиве слов
    console.log(currentDateStat);
    console.log(currentDateStat.length);
    const newWordsFromAnswer = this.answers
      .filter(item => !statistics.optional.stat.newWords.includes(item.id))
      .map(item => item.id);
    const correctAnswers = this.answers.filter(item => item.result).length;
    const wrongAnswers = this.answers.length - correctAnswers;
    const chain = this.getLengthOfLongestChain();

    statistics.learnedWords += correctAnswers;
    if(newWordsFromAnswer.length) statistics.optional.stat.newWords.push(...newWordsFromAnswer);
    let dayStat: IDayStatistics;
    if(currentDateStat.length) {
      [dayStat, ] = currentDateStat;
      console.log('inside',dayStat);
      dayStat.amountNewWordsPerDey += newWordsFromAnswer.length;
      dayStat.correctAnswers += correctAnswers;
      dayStat.games.audiocall.correct += correctAnswers;
      dayStat.games.audiocall.wrong += wrongAnswers;
      dayStat.games.audiocall.chain = chain > dayStat.games.audiocall.chain
        ? chain
        : dayStat.games.audiocall.chain;
      dayStat.allWords += this.answers.length;
    } else {
      dayStat = {
        date: this.date,
        amountNewWordsPerDey: newWordsFromAnswer.length,
        correctAnswers: correctAnswers,
        games: {
          audiocall: {correct: correctAnswers, wrong: wrongAnswers, chain: chain},
          sprint: {correct: 0, wrong: 0, chain: 0},
          oasis: {correct: 0, wrong: 0, chain: 0},
        },
        allWords: this.answers.length,
      };
      statistics.optional.stat.allStat.push(dayStat);
    }

    return statistics;
  }

  private  getDefaultStatistics(): IUserStatistics {
    const correctAnswers = this.answers.filter(item => item.result).length;
    const wrongAnswers = this.answers.length - correctAnswers;
    const chain = this.getLengthOfLongestChain();
    return {
      learnedWords: correctAnswers,
      optional: {
        stat: {
          allStat: [
            {
            date: this.date,
            amountNewWordsPerDey: this.answers.length,
            correctAnswers: correctAnswers,
            games: {
              audiocall: {correct: correctAnswers, wrong: wrongAnswers, chain: chain},
              sprint: {correct: 0, wrong: 0, chain: 0},
              oasis: {correct: 0, wrong: 0, chain: 0},
            },
            allWords: this.answers.length
          }
        ],
          newWords: this.answers.map(item => item.id),
        }
      }
    }
  }

  getLengthOfLongestChain() {
    const chain = this.answers
      .map(item => item.result ? 1 : 0)
      .join('')
      .split('0')
      .map(item => item.length)

      return Math.max(...chain);
  }

  private  getChangedOptions(options: IUserWordOptions, answer: boolean) {
    options.allTry++;
    options.games.audioCall.right += +answer;
    options.games.audioCall.wrong += +!answer;

    return options;
  }

  private  getDefaultOptions(answer: boolean) {
    const options = {
      isDeleted: false,
      addTime: (new Date()).toISOString(),
      games: {
        sprint: { right: 0, wrong: 0 },
        savanna: { right: 0, wrong: 0 },
        oasis: { right: 0, wrong: 0 },
        audioCall: { right: 0 | +answer, wrong: 0 | +!answer },
      },
      allTry: 1
    }
    return options;
  }

  play() {
    const src = this.words[this.index].audio
    const audio = new Audio();
    audio.src = baseUrl + "/" + src;
    audio.load();
    audio.play()
  }

  getRandomIntInclusive(min: number, max: number) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  getRandomWords() {
    const words = [...this.words];
    words.sort(() => Math.random() - 0.5);
    const translate = words.map(item => item.wordTranslate).slice(0,5);
    const wordTranslate = this.words[this.index].wordTranslate;
    if(!translate.includes(wordTranslate)) translate[0] = wordTranslate;
    this.randomWords = translate.sort(() => Math.random() - 0.5);;
  }

  nextWord() {
    this.index++;
    this.play();
    this.getUserWord(this.userId, this.words[this.index].id);
    this.getRandomWords();
    return this.randomWords;
  }

  getRightAnswer(word?: string,) {
    const correctWord = this.words[this.index].word;
    const correctWordTranslate = this.words[this.index].wordTranslate;

    this.getUserWord(this.userId, this.words[this.index].id,word === correctWordTranslate);
    this.pushAnswer(word === correctWordTranslate);
    return {word: correctWord, translate: correctWordTranslate, imgSrc: this.getImageSource()};
  }

  pushAnswer(result: boolean = false) {
    this.answers.push({
      id: this.words[this.index].id,
      result: result,
      word: this.words[this.index].word,
      translate:  this.words[this.index].wordTranslate ,
      audio: this.words[this.index].audio});
  }

  getImageSource() {
    const src = baseUrl + "/" + this.words[this.index].image;
    return src;
  }

  getData() {
    const correctAnswers = this.answers.filter(item => item.result === true).length;
    const wrongAnswers = this.answers.filter(item => item.result === false).length;
    return [correctAnswers, wrongAnswers]
  }

  unSubscribe() {
    if(this._GetWordsSubscription) {
      this._GetWordsSubscription.unsubscribe();
    }
    if(this._GetUserWordSubscription) {
      this._GetUserWordSubscription.unsubscribe();
    }
    if (this._PostUserWordSubscription) {
      this._PostUserWordSubscription.unsubscribe();
    }
    if (this._GetUserStatistics) {
      this._GetUserStatistics.unsubscribe();
    }
    if (this._PutUserStatistics) {
      this._PutUserStatistics.unsubscribe();
    }
  }

  getUserId() {
    const userData = <string>window.localStorage.getItem('userData');
    const userId = JSON.parse(userData).userId;
    this.userId = userId;
  }

}
