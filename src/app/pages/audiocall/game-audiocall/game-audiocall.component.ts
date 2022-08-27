import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { baseUrl } from 'src/api/baseUrl';
import { answer } from 'src/types/audiocall-answer';
import { IWord } from 'src/types/IWord';

@Component({
  selector: 'app-game-audiocall',
  templateUrl: './game-audiocall.component.html',
  styleUrls: ['./game-audiocall.component.css']
})

export class GameAudiocallComponent implements OnInit {
  @Output()
  endGame = new EventEmitter;
  @Input() words: IWord[] = [];
  answers: answer[] = [];
  index: number = 0;
  randomWords!: string[];
  buttonText: string = 'Не знаю';
  imgSrc!: string;
  imgVisible: boolean = false;
  word!: string;


  constructor() {
   }

  ngOnInit(): void {
    this.play();
    this.getRandomWords()

  }

  onStartGame(words: IWord[]) {
    this.words = words;
  }

  startGame() {
    console.log(this.words);
  }

  play() {
    const src = this.words[this.index].audio
    const audio = new Audio();
    audio.src = baseUrl + "/" + src;
    audio.load();
    audio.play()
  }

  getRandomWords() {
    const words = [...this.words];
    words.sort(() => Math.random() - 0.5);
    const translate = words.map(item => item.wordTranslate).slice(0,4);
    translate.push(this.words[this.index].wordTranslate);
    translate.sort(() => Math.random() - 0.5);
    this.randomWords = translate;
  }

  nextWord() {
    if(this.index < 19) {
      this.index++;
      this.play();
      this.getRandomWords();
      this.buttonText = 'Не знаю';
      this.activateDiactivateItems(true);
      this.imgVisible = false;
    } else {
      alert('Game over');
      console.log(this.answers);
      this.endGame.emit(this.answers);
    }
  }

  checkWord(event: Event) {
    const target = <HTMLButtonElement>event.target;
    const word = target.innerText;
    const correctWord = this.words[this.index].wordTranslate;
    this.imgSrc = baseUrl + "/" + this.words[this.index].image;
    this.imgVisible = true;
    this.word = this.words[this.index].word;
    this.answers.push({id: this.words[this.index].id, result: correctWord === word});
    if (correctWord === word) {
      target.classList.add('audiocall__item_correct');
    } else {
      target.classList.add('audiocall__item_incorrect');
    }
    this.activateDiactivateItems(false, correctWord);
    this.buttonText = 'Дальше';
  }

  activateDiactivateItems(activate: boolean, correctWord?: string) {
    const items = document.querySelectorAll('.audiocall__item');
      if(activate) {
        items.forEach((item) => {
          item.classList.remove('audiocall__item_correct', 'audiocall__item_incorrect');
          (<HTMLButtonElement>item).disabled = false;
        })
      } else {
        items.forEach((item) => {
          if ((<HTMLButtonElement>item).innerText === correctWord) {
            item.classList.add('audiocall__item_correct');
          }
          (<HTMLButtonElement>item).disabled = true;
        })
      }
  }

}
