import {Component, OnChanges, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {ApiService} from "../../../core/api.service";
import {IWord} from "../../../../types/IWord";
import {SprintService} from "../../../core/sprint.service";
import {IDayStatistics, IUserStatistics, IUserWord, IUserWordOptions} from "../../../../types/IOptions";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-level',
  templateUrl: './level.component.html',
  styleUrls: ['./level.component.css']
})
export class LevelComponent implements OnInit, OnChanges {
  score: number = 0
  Score: number[] = []
  wordEN!: string
  wordRU!: string
  routerId!: number
  words!: IWord[]
  audio = new Audio()
  wordsRu: any
  SetRight: Set<any> = new Set()
  SetWrong: Set<any> = new Set()
  loader: boolean = true
  index: number = 0
  border!: boolean
  visibleStat: boolean = true
  finished: boolean = false
  correctAnswer: number = 0
  maxRightAnswer: Array<number> = []
  chain!: number
  count = [0, 1, 2, 3, 4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29]
  wordsRight: IWord[]= []
  wordsWrong: IWord[]= []
  private userId!: string;
  private date = (new Date()).toISOString();
  private statistic!: IUserStatistics;


  constructor(private router: Router, private api: ApiService, private act: ActivatedRoute, private  sprintApi:SprintService) {}

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
    this.getStatistics();
    this.putStatistic();
    console.log(this.getStatistics())
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
        this.resultRightGame()
    } else {
      this.resultWrongGame()
    }
  }

  public isWrongAnswer() {
    this.ChangeWord()
    if (this.words[this.index].wordTranslate !== this.wordRU){
      this.resultRightGame()

    } else {
      this.resultWrongGame()
    }
  }
  public resultRightGame() {
    this.Score.push(1);
    this.score = this.Score.length;
    this.border = true;
    this.SetRight.add(this.words[this.index])
    this.SetWrong.delete(this.words[this.index])
    this.correctAnswer++;
    this.chain = Math.max(...(this.maxRightAnswer))
  }
  public resultWrongGame() {
    this.border = false;
    this.SetWrong.add(this.words[this.index])
    this.SetRight.delete(this.words[this.index])
    this.maxRightAnswer.push(this.correctAnswer)
    this.correctAnswer = 0;
    this.chain = Math.max(...(this.maxRightAnswer))
  }

  public playWord() {
// слово
  }

  private  getStatistics(): IUserStatistics {
    const correctAnswers = this.wordsRight.length;
    const wrongAnswers = this.wordsWrong.length;
    const chain = this.chain;
    return this.statistic = {
      learnedWords: correctAnswers,
      optional: {
        stat: {
          allStat: [
            {
              date: this.date,
              amountNewWordsPerDey: this.words.length,
              correctAnswers: correctAnswers,
              games: {
                audiocall: {correct: correctAnswers, wrong: wrongAnswers, chain: chain},
                sprint: {correct: correctAnswers, wrong: wrongAnswers, chain: chain},
                oasis: {correct: 0, wrong: 0, chain: 0},
              },
              allWords: this.words.length
            }
          ],
          newWords: this.words.map(item => item.id),
        }
      }
    }
  }

 getUserId() {
    const userData = <string>window.localStorage.getItem('userData');
    const userId = JSON.parse(userData).userId;
    this.userId = userId;
  }

  public Options() {

  }

  private putStatistic() {
    this.api.putUserStatistics(this.userId, this.statistic)
  }


  ngOnInit(): void {
   // this.sprintApi.playSong();
   this.act.params.subscribe((paramId) => {
     this.routerId = paramId['id'];
   })
    this.randomArr();
    this.getsWords();
    this.getUserId()
  }

  ngOnChanges() {

  }


}

