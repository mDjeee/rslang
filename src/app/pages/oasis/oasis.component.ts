import { Component, OnInit } from '@angular/core';
import { baseUrl } from 'src/api/baseUrl';
import { AudiocallService } from 'src/app/core/audiocall.service';
import { OasisService } from 'src/app/core/oasis.service';
import { answer } from 'src/types/audiocall-answer';
import { IWord } from 'src/types/IWord';

@Component({
  selector: 'app-oasis',
  templateUrl: './oasis.component.html',
  styleUrls: ['./oasis.component.css']
})
export class OasisComponent implements OnInit {

  isLevels = true;
  isCorrect = false;
  isFinished = false;
  correctAnswers: string[] = [];
  wrongAnswers: string[] = [];

  gameWords: IWord[] = [
    {
      id: "string",
      group: 0,
      page: 0,
      word: "string",
      image: "string",
      audio: "string",
      audioMeaning: "string",
      audioExample: "string",
      textMeaning: "string",
      textExample: "string",
      transcription: "string",
      wordTranslate: "string",
      textMeaningTranslate: "string",
      textExampleTranslate: "string"
    },
  ];
  currentWordId = 0;

  constructor(private oasisService: OasisService, private audioCall: AudiocallService) { }

  ngOnInit(): void {
    this.audioCall.answers = [];
  }

  choseLevel(group: number) {
    this.oasisService.choseLevel(group);
    this.gameWords = this.oasisService.gameWords;
    this.isLevels = false;
  }

  checkAnswer(answer: string, translate: string, word: IWord) {
    let right = (<HTMLInputElement>document.getElementById('answer-input')).value;
    let res = answer.toLocaleUpperCase() === right.toLocaleUpperCase()

    this.correctAnswers.push(`${answer} - ${translate}`);

    this.isCorrect = res;
    if(this.isCorrect) {
      const audio = new Audio();
      audio.src = '../../assets/correct.wav';
      audio.load();
      audio.play();

      this.audioCall.answers.push({
        id: word.id,
        result: true,
        word: answer,
        translate: translate,
        audio: word.audio
      })

      this.isFinished = true;
    }
  }

  play(src: string) {
    const audio = new Audio();
    audio.src = baseUrl + "/" + src;
    audio.load();
    audio.play();
  }

  showTranslate(wordRu: string) {
    (<HTMLInputElement>document.getElementById('answer-input')).value = wordRu;
  }

  showFirstLetter(word: string) {
    (<HTMLInputElement>document.getElementById('answer-input')).value = word.charAt(0);
  }

  howManyLetters(word: string) {
    (<HTMLInputElement>document.getElementById('answer-input')).value = word.replace(/./g, "*");
  }

  nextWord() {
    this.isFinished = false;
    this.isCorrect = false;
    this.currentWordId++;
    (<HTMLInputElement>document.getElementById('answer-input')).value = '';
  }

  dontKnow(answer: string, translate: string, word: IWord) {
    const audio = new Audio();
    audio.src = '../../assets/wrong.wav';
    audio.load();
    audio.play();

    this.audioCall.answers.push({
      id: word.id,
      result: false,
      word: answer,
      translate: translate,
      audio: word.audio
    })

    this.wrongAnswers.push(`${answer} - ${translate}`);
    this.isFinished = true;
  }
}
