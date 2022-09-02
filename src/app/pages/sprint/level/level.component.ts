import {Component, OnChanges, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {ApiService} from "../../../core/api.service";
import {IWord} from "../../../../types/IWord";
import {SprintService} from "../../../core/sprint.service";

@Component({
  selector: 'app-level',
  templateUrl: './level.component.html',
  styleUrls: ['./level.component.css']
})
export class LevelComponent implements OnInit, OnChanges {
  score: number = 0
  Score: number[] = []
  wordEN!: string
  wordRU!: any
  routerId!: number;
  words!: IWord[];
  group = 0;
  audio = new Audio();
  wordsRu: any;
  test: any;
  SetRight: Set<any> = new Set()
  SetWrong: Set<any> = new Set()
  SetW: Set<any> = new Set()
  loader: boolean = true;
  index: number = 0;
  border!: boolean;
  visibleStat: boolean = true;
  finished: boolean = false;
  count = [0, 1, 2, 3, 4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29];
  wordsRight: IWord[]= []
  wordsWrong: IWord[]= []
  constructor(private router: Router, private api: ApiService, private act: ActivatedRoute, private  sprintApi:SprintService) {

  }
  public stopSong() {
    this.audio.pause();
  }

  public randomArr() {
    this.count.sort(() => Math.random() - 0.5);
  }

  public getsWords() {
    this.api.getWords(this.routerId,this.count[0]).subscribe((data) => {
      this.words = data;
      this.border = false;
      this.ChangeWord()
      this.loader = false
    })
  }

  public timeOver() {
    this.visibleStat = false;
    this.finished = true;
    this.wordsRight = [...this.SetRight];
    this.wordsWrong = [...this.SetWrong];
    console.log(this.SetWrong)
  }

  public ChangeWord() {
    if (this.index < 19)  {
      this.index++
    } else { this.index = 0}
    this.wordEN = this.words[this.index].word
    this.wordsRu = Math.floor(Math.random() * this.words.length)
    this.wordRU = this.words[this.wordsRu].wordTranslate
    this.border = !this.border
  }

  public isRightAnswer() {
    this.ChangeWord()
    if (this.words[this.index].wordTranslate === this.wordRU) {
      this.Score.push(1);
      this.score = this.Score.length;
      this.border = true;
      this.SetRight.add(this.words[this.index])
      this.SetWrong.delete(this.words[this.index])

    } else {
      this.border = false;
      this.SetWrong.add(this.words[this.index])
      this.SetRight.delete(this.words[this.index])
    }
  }

  public isWrongAnswer() {
    this.ChangeWord()
    if (this.words[this.index].wordTranslate !== this.wordRU){
      this.Score.push(1);
      this.score = this.Score.length;
      this.border = true;
      this.SetRight.add(this.words[this.index])
      this.SetWrong.delete(this.words[this.index])
    } else {
      this.border = false;
      this.SetWrong.add(this.words[this.index])
      this.SetRight.delete(this.words[this.index])
    }
  }


  ngOnInit(): void {
   // this.sprintApi.playSong();
   this.act.params.subscribe((paramId) => {
     this.routerId = paramId['id'];
   })

    this.randomArr();
    this.getsWords();
  }

  ngOnChanges() {

  }


}
//создать сервис и туда всё кинуть
//создать статистику
