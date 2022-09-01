import {Component, OnChanges, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {ApiService} from "../../../core/api.service";
import { IWordGame} from "../../../../types/IWord";
import {Scope} from "eslint";
import {SprintService} from "../../../core/sprint.service";

@Component({
  selector: 'app-level',
  templateUrl: './level.component.html',
  styleUrls: ['./level.component.css']
})
export class LevelComponent implements OnInit, OnChanges {
  public level!: IWordGame [];
  score: number | string
  Score: number[] = []
  wordEN!: string[]
  wordRU!: any
  routerId!: number;
  words!: { [p: string]: string | undefined }[];
  words1!: IWordGame[];
  group = 0;
  audio = new Audio();
  wordsEn: any;
  wordsRu: any;
  test: any;
  wordsTrue: Array<string> = [];
  wordsFalse = [];
  count = [0, 1, 2, 3, 4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29];
  constructor(private router: Router, private api: ApiService, private act: ActivatedRoute, private  sapi:SprintService) {
    this.score = 'Score:' + this.Score.length
  }

  public playSong(): void {
    this.audio.src = '../../assets/music/single.mp3';
    this.audio.load();
    this.audio.play();
  }

  public stopSong() {
    this.audio.pause();
  }

  public randomArr() {
    this.count.sort(() => Math.random() - 0.5);
  }

  public getsWords() {
    this.api.getWords(this.routerId,this.count[0]).subscribe((data) => {
    this.level = data;
    this.words = this.level.map((el) => {
      return {
        [el.word]: el.wordTranslate
      }
    })
      this.ChangeWord()
    })
  }

  public getsWords1() {
    this.api.getWords(this.routerId, this.count[1]).subscribe((data) => {
      this.level = data;
      this.words1 = this.level.map((el) => {
        return {
          word: el.word,
          wordTranslate: el.wordTranslate
        }
      })
    })
  }

  public getsWords2() {
    this.api.getWords(this.routerId, this.count[2]).subscribe((data) => {
      this.level = data;
      this.words = this.level.map((el) => {
        return {
          [el.word]: el.wordTranslate
        }
      })

    })
  }

  public ChangeWord() {
    this.wordsEn = Math.floor(Math.random() * this.words.length)
    this.wordEN = Object.keys(this.words[this.wordsEn])
    this.wordsRu = Math.floor(Math.random() * this.words.length)
    this.wordRU = Object.values(this.words[this.wordsRu])
  }

  public isRightAnswer() {
  this.ChangeWord()
    this.words.forEach((el) => {
      if (el[this.wordEN[0]] === this.wordRU[0]) {
        this.Score.push(1)
        this.score = 'Score:' + (this.Score.length)
        this.wordsTrue.push(<string>el[this.wordEN[0]])
        console.log(this.wordsTrue)
      }
    })
  }

  public isnoRightAnswer() {
    this.ChangeWord()
    this.words.filter((el) => {
        (Object.keys(el).toString()) === (Object.keys(this.words[this.wordsEn]).toString())
      console.log(el)

    })
  }


  ngOnInit(): void {
   // this.playSong();
   this.act.params.subscribe((paramId) => {
     this.routerId = paramId['id'];
   })

    this.randomArr();
    this.getsWords();
    this.getsWords1();
    this.getsWords2();
  }

  ngOnChanges() {

  }


}
//создать сервис и туда всё кинуть
//создать статистику
