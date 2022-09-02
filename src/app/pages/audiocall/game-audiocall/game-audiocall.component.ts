import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { AudiocallService } from 'src/app/core/audiocall.service';


@Component({
  selector: 'app-game-audiocall',
  templateUrl: './game-audiocall.component.html',
  styleUrls: ['./game-audiocall.component.css']
})

export class GameAudiocallComponent implements OnInit {

  randomWords!: string[];
  buttonText: string = 'Не знаю';
  imgSrc!: string;
  imgVisible: boolean = false;
  currentWord!: string;
  translateWord!: string;
  end: boolean = false;

  constructor(private service: AudiocallService) {
   }

  ngOnInit(): void {
    this.randomWords = this.service.nextWord();
  }

  nextWord() {
    if(this.buttonText === 'Не знаю') {
      this.showCorrectAnswer();
      this.activateDiactivateItems(false, this.translateWord);
      this.buttonText = 'Дальше';
    } else {
      if(this.service.index < 9) {
        this.randomWords = this.service.nextWord();
        this.buttonText = 'Не знаю';
        this.activateDiactivateItems(true);
        this.imgVisible = false;
      } else {
        this.service.getStatistics();
        this.end = true;
      }
    }

  }

  showCorrectAnswer (word?: string) {
    const checkWord = this.service.getRightAnswer(word);
    this.translateWord = checkWord.translate;
    this.currentWord = checkWord.word;
    this.imgSrc = checkWord.imgSrc;
    this.imgVisible = true;
    this.activateDiactivateItems(false, this.translateWord);
    if(word) return
  }

  selectWord(event: Event) {
    const target = <HTMLButtonElement>event.target;
    const word = target.innerText;
    this.showCorrectAnswer(word);

    if (this.translateWord === word) {
      target.classList.add('audiocall__item_correct');
    } else {
      target.classList.add('audiocall__item_incorrect');
    }

    this.buttonText = 'Дальше';
  }

  onPlayAudio() {
    this.service.play();
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
