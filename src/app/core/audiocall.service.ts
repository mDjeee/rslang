import { Injectable } from '@angular/core';
import { Subscription } from 'rxjs';
import { baseUrl } from 'src/api/baseUrl';
import { answer } from 'src/types/audiocall-answer';
import { IWord } from 'src/types/IWord';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class AudiocallService {
  _Subscription: Subscription | undefined;
  words: IWord[] = [];
  randomWords!: string[];
  index: number = -1;
  answers: answer[] = [];

  constructor(private api: ApiService) { }

  fetchWords(group: number, page: number){
    this._Subscription = this.api.getWords(group, page).subscribe(books => {
      this.words = books;
      this.words.sort(() => this.getRandomIntInclusive(-1, 1));
    })
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
    this.getRandomWords();
    return this.randomWords;
  }

  getRightAnswer(word?: string,) {
    const correctWord = this.words[this.index].word;
    const correctWordTranslate = this.words[this.index].wordTranslate;
    this.pushAnswer(word === correctWordTranslate);
    return {word: correctWord, translate: correctWordTranslate, imgSrc: this.getImageSource()};
  }

  pushAnswer(result: boolean = false) {
    this.answers.push({id: this.words[this.index].id, result: result});
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
    if(this._Subscription) {
      this._Subscription.unsubscribe();
    }
  }

}
