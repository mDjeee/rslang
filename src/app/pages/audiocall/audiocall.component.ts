import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { forkJoin, Subscription } from 'rxjs';
import { AudiocallService } from 'src/app/core/audiocall.service';
import { BookService } from '../book/book.service';


@Component({
  selector: 'app-audiocall',
  templateUrl: './audiocall.component.html',
  styleUrls: ['./audiocall.component.css']
})
export class AudiocallComponent implements OnInit {
  private _DataStatus: Subscription | undefined;
  message:boolean = false;
  status!: boolean;
  startBtnVisible: boolean = false;
  visible: boolean = true;
  end: boolean = false;
  levelSelectionVisible: boolean = true;
  start: boolean = false;
  page!: number;
  startBtn = <HTMLButtonElement>document.querySelector('.start__btn');

  private _GetWordsStatusSubscription: Subscription | undefined;

  @Output()
  startGame = new EventEmitter;

  constructor(private service: AudiocallService, private bookService: BookService) { }

  ngOnInit(): void {
    this.service.words = [];
    if(this.bookService.fromBook) {
      this.page = this.bookService.page;
      const group = this.bookService.group;
      this.service.getUserId()
      this.levelSelectionVisible = false;
      this.visible = false;
      // this.start = true;
      this._GetWordsStatusSubscription = this.service.existWordsStatus.subscribe(value => {
        console.log('start!',value)
        this.start = value;
      });
      // this._DataStatus = this.service.minWordsStatus.subscribe(value => {
      //   this.message = value
      // })
      this.service.allFetches(this.page, group)
    }
  }


  // onStartGame() {
  //   if (this.service.words.length) {
  //     this.startBtnVisible = this.status;;
  //     this.service.getUserId();
  //   }
  // }

  onEndGame() {
    if (this.service.words.length === this.service.answers.length) {
      console.log('end')
    }
  }

  onStart() {
    const startBtn = <HTMLButtonElement>document.querySelector('.start__btn');
    this._GetWordsStatusSubscription = this.service.existWordsStatus.subscribe(value => this.start = value)
    this.levelSelectionVisible = false;
    this.visible = false;
    startBtn.disabled = true;
  }

  ngOnDestroy(): void {
    this.service.unSubscribe();
    if(this._GetWordsStatusSubscription) {
      this._GetWordsStatusSubscription.unsubscribe()
    }
    if(this._DataStatus) {
      this._DataStatus.unsubscribe()
    }
    this.service.page = 0;
    this.service.index = 0;
    this.service.words = [];
  }

  levelSelected() {
    const startBtn = <HTMLButtonElement>document.querySelector('.start__btn');
    startBtn.disabled = false;
  }
}
