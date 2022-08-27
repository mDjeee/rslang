import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { baseUrl } from 'src/api/baseUrl';
import { ApiService } from 'src/app/core/api.service';
import { IWord } from 'src/types/IWord';

@Component({
  selector: 'app-audiocall',
  templateUrl: './audiocall.component.html',
  styleUrls: ['./audiocall.component.css']
})
export class AudiocallComponent implements OnInit {
  words: IWord[] = [];
  currentWord!: IWord;
  _Subscription: Subscription | undefined;
  group!: number;
  page = 0;
  baseImg = baseUrl + "/";
  answers: IWord[] = [];
  visible: boolean = true;

  @Output()
  startGame = new EventEmitter;

  constructor(private api: ApiService) { }

  ngOnInit(): void {

  }

  onStartGame(words: IWord[]) {

    this.words = words;
    // this.startGame.emit(this.words);
    this.currentWord = words[0];
    console.log(words);
  }

  onStart() {
    console.log(this.words)
    this.visible = false;

  }

  startGames(words: IWord[]) {
    console.log(this.words)
  }
}
