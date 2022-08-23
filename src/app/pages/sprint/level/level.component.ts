import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {ApiService} from "../../../core/api.service";
import { IWordGame} from "../../../../types/IWord";
import {map, Subscription, merge} from "rxjs";

const audio = new Audio();
@Component({
  selector: 'app-level',
  templateUrl: './level.component.html',
  styleUrls: ['./level.component.css']
})
export class LevelComponent implements OnInit {
  public level!: IWordGame [];
  score!: number | string
  wordEN!: string
  wordRU!: string
  routerId!: number;
  words_0!: IWordGame[];
  words_1!: IWordGame[];
  group = 0

  constructor(private router: Router, private api: ApiService, private act: ActivatedRoute) {
    this.score = 'Score:' + 0;
  }

  public playSong(): void {
    audio.src = '../../assets/music/single.mp3';
    audio.load();
    audio.play();
  }

  public stopSong() {
    audio.pause();
  }
  public getsWords() {
    this.api.getWords(this.routerId, 1).subscribe((data) => {
    this.level = data;
    this.words_0 = this.level.map((el) => {
      return {
        word: el.word,
        wordTranslate: el.wordTranslate
      }
    })
      console.log(this.words_0)
    })
  }
  public getsWords1() {
    this.api.getWords(this.routerId, 0).subscribe((data) => {
      this.level = data;
      this.words_1 = this.level.map((el) => {
        return {
          word: el.word,
          wordTranslate: el.wordTranslate
        }
      })
    })
  }

  ngOnInit(): void {
   // this.playSong();
   this.act.params.subscribe((paramId) => {
     this.routerId = paramId['id'];
   })
     this.getsWords();
     this.getsWords1();
    console.log('ttt')
  }


}
